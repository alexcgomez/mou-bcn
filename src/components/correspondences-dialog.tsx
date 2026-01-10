"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, ArrowRightLeft } from "lucide-react";
import type { Correspondence } from "@/lib/types";

async function fetchCorrespondences(
  lineCode: number,
  stationCode: number
): Promise<Correspondence[]> {
  const response = await fetch(
    `/api/correspondences?lineCode=${lineCode}&stationCode=${stationCode}`
  );
  if (!response.ok) {
    throw new Error("Error al carregar les correspondències");
  }
  return response.json();
}

interface CorrespondencesDialogProps {
  lineCode: number;
  stationCode: number;
  stationName: string;
  trigger: React.ReactNode;
}

export function CorrespondencesDialog({
  lineCode,
  stationCode,
  stationName,
  trigger,
}: CorrespondencesDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [correspondences, setCorrespondences] = useState<Correspondence[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open && correspondences.length === 0 && !loading) {
      loadCorrespondences();
    }
  }, [open]);

  const loadCorrespondences = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCorrespondences(lineCode, stationCode);
      setCorrespondences(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Error al carregar les correspondències"
      );
    } finally {
      setLoading(false);
    }
  };

  // Agrupar correspondencias por familia
  const groupedByFamily = correspondences.reduce(
    (acc, corr) => {
      if (!acc[corr.family]) {
        acc[corr.family] = [];
      }
      acc[corr.family].push(corr);
      return acc;
    },
    {} as Record<string, Correspondence[]>
  );

  const familyOrder = ["Metro", "Bus", "Verticals", "Funicular"];
  const sortedFamilies = Object.keys(groupedByFamily).sort((a, b) => {
    const indexA = familyOrder.indexOf(a);
    const indexB = familyOrder.indexOf(b);
    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5" aria-hidden="true" />
            Correspondències - {stationName}
          </DialogTitle>
          <DialogDescription>
            Línies i transports disponibles des d'aquesta estació
          </DialogDescription>
        </DialogHeader>

        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            <span className="ml-2 text-sm text-gray-600">
              Carregant correspondències...
            </span>
          </div>
        )}

        {error && (
          <div className="py-4 text-center text-sm text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && correspondences.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            No hi ha correspondències disponibles per a aquesta estació
          </div>
        )}

        {!loading && !error && correspondences.length > 0 && (
          <div className="space-y-6">
            {sortedFamilies.map((family) => (
              <div key={family} className="space-y-3">
                <h3 className="font-semibold text-lg text-gray-900 border-b pb-2">
                  {family}
                </h3>
                <div className="grid gap-3">
                  {groupedByFamily[family].map((corr) => (
                    <button
                      key={corr.id}
                      onClick={() => {
                        if (corr.family === "Metro") {
                          setOpen(false);
                          router.push(`/lines/${corr.lineCode}`);
                        }
                      }}
                      disabled={corr.family !== "Metro"}
                      className={`block w-full text-left p-4 rounded-lg border transition-colors focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 ${
                        corr.family === "Metro"
                          ? "hover:bg-gray-50 cursor-pointer"
                          : "opacity-60 cursor-not-allowed"
                      }`}
                      aria-label={
                        corr.family === "Metro"
                          ? `Anar a la línia ${corr.lineName}`
                          : `${corr.lineName} - No disponible`
                      }
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge
                              className="text-white font-bold"
                              style={{ backgroundColor: corr.lineColor }}
                            >
                              {corr.lineName}
                            </Badge>
                            <span className="font-semibold text-gray-900">
                              {corr.stationName}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            {corr.lineDescription}
                          </p>
                          <p className="text-xs text-gray-500">
                            {corr.lineOrigin} → {corr.lineDestination}
                          </p>
                          {corr.operator && (
                            <p className="text-xs text-gray-400 mt-1">
                              Operador: {corr.operator}
                            </p>
                          )}
                        </div>
                        {corr.family === "Metro" && (
                          <ArrowRightLeft className="w-5 h-5 text-gray-400 shrink-0" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
