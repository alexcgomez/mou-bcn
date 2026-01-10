"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function LineDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error en la página de detalle de línea:", error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-md w-full">
        <CardHeader>
          <div className="flex items-center gap-3">
            <AlertCircle className="h-6 w-6 text-red-600" />
            <CardTitle>Error al cargar la línia</CardTitle>
          </div>
          <CardDescription>
            Hi ha hagut un problema en carregar la informació de la línia. Si us plau, torna-ho a intentar.
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
            <Link href="/lines">
              <Button variant="outline" className="flex-1">
                Tornar a línies
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
