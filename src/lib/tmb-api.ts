import type {
  TMBResponse,
  MetroLineProperties,
  MetroStationProperties,
  MetroLine,
  MetroStation,
  MetroLineWithStations,
  CorrespondenceProperties,
  Correspondence,
} from "./types";
import "./env"; // Validar variables de entorno al importar

const TMB_BASE_URL = "https://api.tmb.cat/v1/transit";
const APP_ID = process.env.TMB_APP_ID;
const APP_KEY = process.env.TMB_APP_KEY;

export class TMBAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public endpoint?: string
  ) {
    super(message);
    this.name = "TMBAPIError";
  }
}

async function fetchTMB<T>(endpoint: string): Promise<TMBResponse<T>> {
  if (!APP_ID || !APP_KEY) {
    throw new TMBAPIError(
      "TMB API credentials are not configured. Please check your environment variables.",
      undefined,
      endpoint
    );
  }

  const url = `${TMB_BASE_URL}${endpoint}?app_id=${APP_ID}&app_key=${APP_KEY}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache por 1 hora
    });

    if (!response.ok) {
      // Intentar obtener más información del error
      let errorMessage = `TMB API error: ${response.status}`;
      try {
        const errorData = await response.json().catch(() => null);
        if (errorData?.message) {
          errorMessage = errorData.message;
        }
      } catch {
        // Si no se puede parsear el JSON, usar el mensaje por defecto
      }

      throw new TMBAPIError(
        errorMessage,
        response.status,
        endpoint
      );
    }

    return response.json();
  } catch (error) {
    // Si es un error de red o timeout
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new TMBAPIError(
        "No s'ha pogut connectar amb l'API de TMB. Si us plau, torna-ho a intentar més tard.",
        undefined,
        endpoint
      );
    }
    // Si ya es un TMBAPIError, re-lanzarlo
    if (error instanceof TMBAPIError) {
      throw error;
    }
    // Otros errores
    throw new TMBAPIError(
      `Error inesperat en la comunicació amb l'API de TMB: ${error instanceof Error ? error.message : "Error desconegut"}`,
      undefined,
      endpoint
    );
  }
}

// Obtener todas las líneas de metro
export async function getMetroLines(): Promise<MetroLine[]> {
  try {
    const data = await fetchTMB<MetroLineProperties>("/linies/metro");

    if (!data.features || data.features.length === 0) {
      throw new TMBAPIError(
        "No s'han trobat línies de metro. L'API ha retornat dades buides.",
        undefined,
        "/linies/metro"
      );
    }

    return data.features
      .map((feature) => ({
        id: feature.id,
        code: feature.properties.CODI_LINIA,
        name: feature.properties.NOM_LINIA,
        description: feature.properties.DESC_LINIA,
        origin: feature.properties.ORIGEN_LINIA,
        destination: feature.properties.DESTI_LINIA,
        color: `#${feature.properties.COLOR_LINIA}`,
        order: feature.properties.ORDRE_LINIA,
      }))
      .sort((a, b) => a.order - b.order);
  } catch (error) {
    if (error instanceof TMBAPIError) {
      throw error;
    }
    throw new TMBAPIError(
      `Error al obtenir les línies de metro: ${error instanceof Error ? error.message : "Error desconegut"}`,
      undefined,
      "/linies/metro"
    );
  }
}

// Obtener estaciones de una línea de metro
export async function getMetroStations(lineCode: number): Promise<MetroStation[]> {
  try {
    const data = await fetchTMB<MetroStationProperties>(
      `/linies/metro/${lineCode}/estacions`
    );

    if (!data.features || data.features.length === 0) {
      throw new TMBAPIError(
        `No s'han trobat estacions per a la línia ${lineCode}.`,
        undefined,
        `/linies/metro/${lineCode}/estacions`
      );
    }

    return data.features
      .map((feature) => {
        const accessibility = feature.properties.NOM_TIPUS_ACCESSIBILITAT;
        const isAccessible = accessibility?.toLowerCase() === "accessible";
        
        return {
          id: feature.id,
          code: feature.properties.CODI_ESTACIO,
          name: feature.properties.NOM_ESTACIO,
          order: feature.properties.ORDRE_ESTACIO,
          origin: feature.properties.ORIGEN_SERVEI,
          destination: feature.properties.DESTI_SERVEI,
          status: feature.properties.NOM_TIPUS_ESTAT,
          coordinates: feature.geometry.coordinates as [number, number],
          accessibility: accessibility || undefined,
          isAccessible: isAccessible || false,
          stationLineCode: feature.properties.CODI_ESTACIO_LINIA,
        };
      })
      .sort((a, b) => a.order - b.order);
  } catch (error) {
    if (error instanceof TMBAPIError) {
      throw error;
    }
    throw new TMBAPIError(
      `Error al obtenir les estacions de la línia ${lineCode}: ${error instanceof Error ? error.message : "Error desconegut"}`,
      undefined,
      `/linies/metro/${lineCode}/estacions`
    );
  }
}

// Obtener una línea específica por código
export async function getMetroLine(lineCode: number): Promise<MetroLine | null> {
  const lines = await getMetroLines();
  return lines.find((line) => line.code === lineCode) || null;
}

// Obtener todas las líneas con sus estaciones (para el mapa general)
export async function getAllLinesWithStations(): Promise<MetroLineWithStations[]> {
  try {
    const lines = await getMetroLines();
    
    const linesWithStations = await Promise.all(
      lines.map(async (line) => {
        try {
          const stations = await getMetroStations(line.code);
          return {
            ...line,
            stations,
          };
        } catch (error) {
          // Si falla obtener estaciones de una línea, continuar con estaciones vacías
          console.warn(`No s'han pogut obtenir estacions per a la línia ${line.code}:`, error);
          return {
            ...line,
            stations: [],
          };
        }
      })
    );
    
    return linesWithStations;
  } catch (error) {
    if (error instanceof TMBAPIError) {
      throw error;
    }
    throw new TMBAPIError(
      `Error al obtenir les línies amb estacions: ${error instanceof Error ? error.message : "Error desconegut"}`,
      undefined,
      "/linies/metro"
    );
  }
}

// Obtener correspondencias de una estación
export async function getStationCorrespondences(
  lineCode: number,
  stationCode: number
): Promise<Correspondence[]> {
  try {
    const data = await fetchTMB<CorrespondenceProperties>(
      `/linies/metro/${lineCode}/estacions/${stationCode}/corresp`
    );

    if (!data.features || data.features.length === 0) {
      return [];
    }

    return data.features.map((feature) => {
      const coords = feature.geometry.coordinates as [number, number];
      return {
        id: feature.id,
        lineCode: feature.properties.CODI_LINIA,
        lineName: feature.properties.NOM_LINIA,
        lineDescription: feature.properties.DESC_LINIA,
        lineOrigin: feature.properties.ORIGEN_LINIA,
        lineDestination: feature.properties.DESTI_LINIA,
        lineColor: `#${feature.properties.COLOR_LINIA}`,
        family: feature.properties.NOM_FAMILIA,
        operator: feature.properties.NOM_OPERADOR,
        stationName: feature.properties.NOM_ELEMENT_CORRESP,
        coordinates: coords,
      };
    });
  } catch (error) {
    // Si no hay correspondencias o hay error, retornar array vacío
    // (no es crítico para la funcionalidad principal)
    if (error instanceof TMBAPIError && error.statusCode === 404) {
      return [];
    }
    console.warn(
      `Error al obtenir correspondències per a l'estació ${stationCode} de la línia ${lineCode}:`,
      error
    );
    return [];
  }
}
