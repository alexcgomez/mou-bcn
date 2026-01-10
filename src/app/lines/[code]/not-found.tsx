import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPinOff } from "lucide-react";

export default function LineNotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]" role="alert">
      <Card className="max-w-md w-full">
        <CardHeader>
          <div className="flex items-center gap-3">
            <MapPinOff className="h-6 w-6 text-gray-500" aria-hidden="true" />
            <CardTitle>Línia no trobada</CardTitle>
          </div>
          <CardDescription>
            La línia de metro que busques no existeix o no està disponible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/lines">
            <Button 
              className="w-full focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
              aria-label="Tornar a la llista de línies"
            >
              Tornar a la llista de línies
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
