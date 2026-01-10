import type {
  TMBResponse,
  MetroLineProperties,
  MetroStationProperties,
  MetroLine,
  MetroStation,
} from "./types";

const TMB_BASE_URL = "https://api.tmb.cat/v1/transit";
const APP_ID = process.env.TMB_APP_ID;
const APP_KEY = process.env.TMB_APP_KEY;

async function fetchTMB<T>(endpoint: string): Promise<TMBResponse<T>> {
  const url = `${TMB_BASE_URL}${endpoint}?app_id=${APP_ID}&app_key=${APP_KEY}`;

  const response = await fetch(url, {
    next: { revalidate: 3600 }, // Cache por 1 hora
  });

  if (!response.ok) {
    throw new Error(`TMB API error: ${response.status}`);
  }

  return response.json();
}

// Obtener todas las líneas de metro
export async function getMetroLines(): Promise<MetroLine[]> {
  const data = await fetchTMB<MetroLineProperties>("/linies/metro");

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
}

// Obtener estaciones de una línea de metro
export async function getMetroStations(lineCode: number): Promise<MetroStation[]> {
  const data = await fetchTMB<MetroStationProperties>(
    `/linies/metro/${lineCode}/estacions`
  );

  return data.features
    .map((feature) => ({
      id: feature.id,
      code: feature.properties.CODI_ESTACIO,
      name: feature.properties.NOM_ESTACIO,
      order: feature.properties.ORDRE_ESTACIO,
      origin: feature.properties.ORIGEN_SERVEI,
      destination: feature.properties.DESTI_SERVEI,
      status: feature.properties.NOM_TIPUS_ESTAT,
    }))
    .sort((a, b) => a.order - b.order);
}

// Obtener una línea específica por código
export async function getMetroLine(lineCode: number): Promise<MetroLine | null> {
  const lines = await getMetroLines();
  return lines.find((line) => line.code === lineCode) || null;
}
