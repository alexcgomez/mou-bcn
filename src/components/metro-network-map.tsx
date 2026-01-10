"use client";

import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MapControls,
  MapRoute,
} from "@/components/ui/map";
import type { MetroLineWithStations } from "@/lib/types";
import Link from "next/link";

interface MetroNetworkMapProps {
  lines: MetroLineWithStations[];
}

export function MetroNetworkMap({ lines }: MetroNetworkMapProps) {
  // Centro de Barcelona
  const center: [number, number] = [2.1734, 41.3851];

  return (
    <div className="h-[500px] w-full rounded-xl overflow-hidden border shadow-lg">
      <Map center={center} zoom={12}>
        {/* Dibujar todas las rutas */}
        {lines.map((line) => (
          <MapRoute
            key={`route-${line.id}`}
            coordinates={line.stations.map((s) => s.coordinates)}
            color={line.color}
            width={4}
            opacity={0.85}
          />
        ))}

        {/* Marcadores de estaciones */}
        {lines.map((line) =>
          line.stations.map((station) => (
            <MapMarker
              key={`${line.id}-${station.id}`}
              longitude={station.coordinates[0]}
              latitude={station.coordinates[1]}
            >
              <MarkerContent>
                <div
                  className="w-3 h-3 rounded-full border-2 border-white shadow-md"
                  style={{ backgroundColor: line.color }}
                />
              </MarkerContent>
              <MarkerPopup className="min-w-[220px]">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-flex items-center justify-center px-2 py-0.5 rounded text-white text-xs font-bold"
                      style={{ backgroundColor: line.color }}
                    >
                      {line.name}
                    </span>
                    <span className="font-semibold text-sm">{station.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {station.origin} → {station.destination}
                  </p>
                  <Link
                    href={`/lines/${line.code}`}
                    className="inline-block text-xs text-blue-600 hover:underline"
                  >
                    Veure línia {line.name} →
                  </Link>
                </div>
              </MarkerPopup>
            </MapMarker>
          ))
        )}

        <MapControls position="bottom-right" showZoom showLocate />
      </Map>
    </div>
  );
}
