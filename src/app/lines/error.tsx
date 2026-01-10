"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function LinesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error en la página de líneas:", error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-md w-full">
        <CardHeader>
          <div className="flex items-center gap-3">
            <AlertCircle className="h-6 w-6 text-red-600" />
            <CardTitle>Error al cargar las líneas</CardTitle>
          </div>
          <CardDescription>
            Hi ha hagut un problema en carregar les línies de metro. Si us plau, torna-ho a intentar.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {process.env.NODE_ENV === "development" && (
            <div className="p-3 bg-gray-100 rounded-md text-sm font-mono text-gray-700">
              {error.message}
            </div>
          )}
          <div className="flex gap-3">
            <Button onClick={reset} className="flex-1">
              Tornar-ho a intentar
            </Button>
            <Button variant="outline" onClick={() => window.location.href = "/"} className="flex-1">
              Anar a l'inici
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
