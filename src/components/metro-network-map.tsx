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
                <div className="relative">
                  <div
                    className="w-3 h-3 rounded-full border-2 border-white shadow-md"
                    style={{ backgroundColor: line.color }}
                  />
                  {station.isAccessible && (
                    <div
                      className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-blue-500 border border-white shadow-sm"
                      title="Estació accessible"
                      aria-label="Estació accessible"
                    />
                  )}
                </div>
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
                  <div className="flex items-center gap-2 flex-wrap">
                    {station.isAccessible && (
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-blue-100 text-blue-800"
                        title="Estació accessible"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="w-3 h-3"
                          aria-hidden="true"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                          <path d="M2 12h20" />
                        </svg>
                        Accessible
                      </span>
                    )}
                  </div>
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
