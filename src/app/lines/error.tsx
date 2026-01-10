"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { TMBAPIError } from "@/lib/tmb-api";

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

  const isAPIError = error instanceof TMBAPIError || error.name === "TMBAPIError";
  const isAPIUnavailable = error.message.includes("connectar") || error.message.includes("connect");

  return (
    <div className="flex items-center justify-center min-h-[60vh]" role="alert" aria-live="polite">
      <Card className="max-w-md w-full">
        <CardHeader>
          <div className="flex items-center gap-3">
            <AlertCircle className="h-6 w-6 text-red-600" aria-hidden="true" />
            <CardTitle>Error al carregar les línies</CardTitle>
          </div>
          <CardDescription>
            {isAPIUnavailable
              ? "No s'ha pogut connectar amb l'API de TMB. Verifica la teva connexió a Internet i torna-ho a intentar."
              : isAPIError
              ? "Hi ha hagut un problema en carregar les dades del metro. Si us plau, torna-ho a intentar."
              : "Hi ha hagut un problema inesperat. Si us plau, torna-ho a intentar."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {process.env.NODE_ENV === "development" && (
            <div className="p-3 bg-gray-100 rounded-md text-sm font-mono text-gray-700" role="log">
              {error.message}
            </div>
          )}
          <div className="flex gap-3">
            <Button onClick={reset} className="flex-1" aria-label="Tornar a intentar carregar les línies">
              Tornar-ho a intentar
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = "/"} 
              className="flex-1"
              aria-label="Anar a la pàgina d'inici"
            >
              Anar a l'inici
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
