"use client";

import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MapControls,
  MapRoute,
} from "@/components/ui/map";
import type { MetroStation } from "@/lib/types";

interface LineMapProps {
  stations: MetroStation[];
  lineColor: string;
  lineName: string;
}

export function LineMap({ stations, lineColor, lineName }: LineMapProps) {
  // Calcular el centro del mapa basado en las estaciones
  const bounds = stations.reduce(
    (acc, station) => ({
      minLng: Math.min(acc.minLng, station.coordinates[0]),
      maxLng: Math.max(acc.maxLng, station.coordinates[0]),
      minLat: Math.min(acc.minLat, station.coordinates[1]),
      maxLat: Math.max(acc.maxLat, station.coordinates[1]),
    }),
    {
      minLng: Infinity,
      maxLng: -Infinity,
      minLat: Infinity,
      maxLat: -Infinity,
    }
  );

  const center: [number, number] = [
    (bounds.minLng + bounds.maxLng) / 2,
    (bounds.minLat + bounds.maxLat) / 2,
  ];

  // Coordenadas para la ruta (línea que conecta las estaciones)
  const routeCoordinates: [number, number][] = stations.map(
    (s) => s.coordinates
  );

  return (
    <div className="h-[400px] w-full rounded-xl overflow-hidden border shadow-lg">
      <Map center={center} zoom={12}>
        {/* Línea que conecta las estaciones */}
        <MapRoute
          coordinates={routeCoordinates}
          color={lineColor}
          width={4}
          opacity={0.9}
        />

        {/* Marcadores de estaciones */}
        {stations.map((station, index) => (
          <MapMarker
            key={station.id}
            longitude={station.coordinates[0]}
            latitude={station.coordinates[1]}
          >
            <MarkerContent>
              <div
                className="flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold border-2 border-white shadow-md"
                style={{ backgroundColor: lineColor }}
              >
                {index + 1}
              </div>
            </MarkerContent>
            <MarkerPopup className="min-w-[200px]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span
                    className="inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold"
                    style={{ backgroundColor: lineColor }}
                  >
                    {lineName}
                  </span>
                  <span className="font-semibold">{station.name}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {station.origin} → {station.destination}
                </p>
                <p className="text-xs">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full ${
                      station.status === "En servei"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {station.status}
                  </span>
                </p>
              </div>
            </MarkerPopup>
          </MapMarker>
        ))}

        <MapControls position="bottom-right" showZoom showLocate />
      </Map>
    </div>
  );
}
