"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AccessibilityFilter } from "@/components/accessibility-filter";
import { CorrespondencesDialog } from "@/components/correspondences-dialog";
import { ArrowRightLeft } from "lucide-react";
import type { MetroStation } from "@/lib/types";

interface StationsTableProps {
  stations: MetroStation[];
  lineColor: string;
  lineCode: number;
}

export function StationsTable({ stations, lineColor, lineCode }: StationsTableProps) {
  const [showOnlyAccessible, setShowOnlyAccessible] = useState(false);

  const accessibleStations = useMemo(
    () => stations.filter((s) => s.isAccessible).length,
    [stations]
  );

  const filteredStations = useMemo(
    () =>
      showOnlyAccessible
        ? stations.filter((s) => s.isAccessible)
        : stations,
    [stations, showOnlyAccessible]
  );

  return (
    <div className="space-y-4">
      <AccessibilityFilter
        totalStations={stations.length}
        accessibleStations={accessibleStations}
        onFilterChange={setShowOnlyAccessible}
      />
      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100 hover:bg-gray-100">
              <TableHead
                className="w-16 font-semibold text-center bg-gray-100"
                scope="col"
              >
                #
              </TableHead>
              <TableHead className="font-semibold bg-gray-100" scope="col">
                Estació
              </TableHead>
              <TableHead
                className="font-semibold hidden sm:table-cell bg-gray-100"
                scope="col"
              >
                Origen servei
              </TableHead>
              <TableHead
                className="font-semibold hidden sm:table-cell bg-gray-100"
                scope="col"
              >
                Destí servei
              </TableHead>
              <TableHead
                className="font-semibold text-center w-28 bg-gray-100"
                scope="col"
              >
                Accesibilitat
              </TableHead>
              <TableHead
                className="font-semibold text-center w-28 bg-gray-100"
                scope="col"
              >
                Estat
              </TableHead>
              <TableHead
                className="font-semibold text-center w-32 bg-gray-100"
                scope="col"
              >
                Correspondències
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStations.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-8 text-gray-500"
                >
                  No hi ha estacions que coincideixin amb el filtre
                </TableCell>
              </TableRow>
            ) : (
              filteredStations.map((station, index) => {
                const originalIndex = stations.findIndex(
                  (s) => s.id === station.id
                );
                return (
                  <TableRow
                    key={station.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <TableCell className="text-center py-3">
                      <span
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold"
                        style={{ backgroundColor: lineColor }}
                        aria-label={`Estació número ${originalIndex + 1}`}
                      >
                        {originalIndex + 1}
                      </span>
                    </TableCell>
                    <TableCell className="font-semibold text-gray-900 py-3">
                      {station.name}
                    </TableCell>
                    <TableCell className="text-gray-600 hidden sm:table-cell py-3">
                      {station.origin}
                    </TableCell>
                    <TableCell className="text-gray-600 hidden sm:table-cell py-3">
                      {station.destination}
                    </TableCell>
                    <TableCell className="text-center py-3">
                      {station.isAccessible ? (
                        <Badge
                          className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200"
                          aria-label="Estació accessible"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-3 h-3 mr-1"
                            aria-hidden="true"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            <path d="M2 12h20" />
                          </svg>
                          Accessible
                        </Badge>
                      ) : (
                        <span className="text-gray-400 text-sm">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center py-3">
                      <Badge
                        variant={
                          station.status === "Operatiu" ||
                          station.status === "En servei"
                            ? "default"
                            : "secondary"
                        }
                        className={
                          station.status === "Operatiu" ||
                          station.status === "En servei"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : ""
                        }
                        aria-label={`Estat: ${station.status}`}
                      >
                        {station.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center py-3">
                      {station.stationLineCode ? (
                        <CorrespondencesDialog
                          lineCode={lineCode}
                          stationCode={station.stationLineCode}
                          stationName={station.name}
                          trigger={
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1.5 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
                              aria-label={`Veure correspondències de ${station.name}`}
                            >
                              <ArrowRightLeft className="w-3.5 h-3.5" aria-hidden="true" />
                              <span className="hidden sm:inline">Corresp.</span>
                            </Button>
                          }
                        />
                      ) : (
                        <span className="text-gray-400 text-sm">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
