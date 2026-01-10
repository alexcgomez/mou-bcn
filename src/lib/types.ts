// Tipos para la API de TMB Transit

export interface TMBResponse<T> {
  type: string;
  totalFeatures: number;
  features: TMBFeature<T>[];
  crs?: {
    type: string;
    properties: {
      name: string;
    };
  };
}

export interface TMBFeature<T> {
  type: "Feature";
  id: string;
  geometry: {
    type: string;
    coordinates: number[] | number[][];
  };
  geometry_name: string;
  properties: T;
}

// Propiedades de una línea de Metro
export interface MetroLineProperties {
  ID_LINIA: number;
  CODI_LINIA: number;
  NOM_LINIA: string;
  DESC_LINIA: string;
  ORIGEN_LINIA: string;
  DESTI_LINIA: string;
  COLOR_LINIA: string; // hex sin #
  COLOR_AUX_LINIA: string;
  COLOR_TEXT_LINIA: string;
  ORDRE_LINIA: number;
  CODI_FAMILIA: number;
  NOM_FAMILIA: string;
  ID_OPERADOR: number;
  NOM_OPERADOR: string;
  NOM_TIPUS_TRANSPORT: string;
}

// Propiedades de una estación de Metro
export interface MetroStationProperties {
  CODI_ESTACIO: number;
  NOM_ESTACIO: string;
  CODI_ESTACIO_LINIA: number;
  ORDRE_ESTACIO: number;
  ORIGEN_SERVEI: string;
  DESTI_SERVEI: string;
  ID_TIPUS_ESTAT: number;
  NOM_TIPUS_ESTAT: string;
  CODI_GRUP_ESTACIO: number;
  DATA_INICI: string | null;
  DATA_FI: string | null;
  ID_TIPUS_ACCESSIBILITAT?: number;
  NOM_TIPUS_ACCESSIBILITAT?: string;
}

// Tipos simplificados para usar en componentes
export interface MetroLine {
  id: string;
  code: number;
  name: string;
  description: string;
  origin: string;
  destination: string;
  color: string;
  order: number;
}

export interface MetroStation {
  id: string;
  code: number;
  name: string;
  order: number;
  origin: string;
  destination: string;
  status: string;
  coordinates: [number, number]; // [longitude, latitude]
  accessibility?: string; // "Accessible", etc.
  isAccessible?: boolean; // true si es accesible
  stationLineCode?: number; // CODI_ESTACIO_LINIA - necesario para correspondencias
}

// Línea con sus estaciones (para el mapa general)
export interface MetroLineWithStations extends MetroLine {
  stations: MetroStation[];
}

// Propiedades de una correspondencia desde la API
export interface CorrespondenceProperties {
  ID_ESTACIO: number;
  CODI_ESTACIO: number;
  ID_LINIA_BASE: number;
  CODI_LINIA_BASE: number;
  ID_LINIA: number;
  CODI_LINIA: number;
  NOM_LINIA: string;
  DESC_LINIA: string;
  ORIGEN_LINIA: string;
  DESTI_LINIA: string;
  COLOR_LINIA: string;
  COLOR_TEXT_LINIA: string;
  CODI_FAMILIA: number;
  NOM_FAMILIA: string;
  ID_OPERADOR: number;
  NOM_OPERADOR: string;
  CODI_OPERADOR: string;
  ORDRE_LINIA: number;
  NOM_ELEMENT_CORRESP: string;
  DESC_CORRESP: string;
}

// Tipo simplificado para correspondencias
export interface Correspondence {
  id: string;
  lineCode: number;
  lineName: string;
  lineDescription: string;
  lineOrigin: string;
  lineDestination: string;
  lineColor: string;
  family: string; // "Metro", "Verticals", "Bus", etc.
  operator: string;
  stationName: string;
  coordinates: [number, number];
}
