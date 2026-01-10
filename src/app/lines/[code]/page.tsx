import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getMetroLine, getMetroStations } from "@/lib/tmb-api";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineMapWrapper } from "@/components/line-map-wrapper";
import { StationsTable } from "@/components/stations-table";

interface PageProps {
  params: Promise<{ code: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params;
  const lineCode = parseInt(code, 10);

  if (isNaN(lineCode)) {
    return {
      title: "Línia no trobada",
    };
  }

  const line = await getMetroLine(lineCode);

  if (!line) {
    return {
      title: "Línia no trobada",
    };
  }

  const stations = await getMetroStations(lineCode);

  return {
    title: `${line.name} - ${line.description}`,
    description: `Informació completa de la línia ${line.name} del metro de Barcelona. ${stations.length} estacions des de ${line.origin} fins a ${line.destination}.`,
    openGraph: {
      title: `${line.name} - ${line.description}`,
      description: `Línia ${line.name}: ${line.origin} → ${line.destination} (${stations.length} estacions)`,
      url: `/lines/${line.code}`,
    },
    twitter: {
      title: `${line.name} - ${line.description}`,
      description: `Línia ${line.name}: ${line.origin} → ${line.destination} (${stations.length} estacions)`,
    },
  };
}

export default async function LineDetailPage({ params }: PageProps) {
  const { code } = await params;
  const lineCode = parseInt(code, 10);

  if (isNaN(lineCode)) {
    notFound();
  }

  const [line, stations] = await Promise.all([
    getMetroLine(lineCode),
    getMetroStations(lineCode),
  ]);

  if (!line) {
    notFound();
  }

  return (
    <div className="space-y-4 pb-4">
      {/* Breadcrumb y navegación */}
      <nav aria-label="Navegació">
        <div className="flex items-center justify-between">
          <Link href="/lines">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
              aria-label="Tornar a la llista de línies"
            >
              <span aria-hidden="true">←</span>
              <span>Tornar a línies</span>
            </Button>
          </Link>
        </div>
      </nav>

      {/* Header de la línea */}
      <header 
        className="rounded-xl p-6 text-white shadow-lg"
        style={{ backgroundColor: line.color }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur" aria-hidden="true">
            <span className="text-3xl font-bold">{line.name}</span>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold">{line.description}</h1>
            <p className="mt-2 text-white/90 text-lg" aria-label={`Ruta: de ${line.origin} a ${line.destination}`}>
              {line.origin} → {line.destination}
            </p>
            <div className="mt-3 flex items-center gap-4 flex-wrap">
              <span className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-medium" aria-label={`${stations.length} estacions`}>
                <span className="w-2 h-2 rounded-full bg-white" aria-hidden="true"></span>
                {stations.length} estacions
              </span>
              {(() => {
                const accessibleCount = stations.filter((s) => s.isAccessible).length;
                const percentage = Math.round((accessibleCount / stations.length) * 100);
                return accessibleCount > 0 ? (
                  <span className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-medium" aria-label={`${accessibleCount} estacions accessibles (${percentage}%)`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4"
                      aria-hidden="true"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      <path d="M2 12h20" />
                    </svg>
                    {accessibleCount} accessibles ({percentage}%)
                  </span>
                ) : null;
              })()}
            </div>
          </div>
        </div>
      </header>

      {/* Mapa de la línea */}
      <section aria-label={`Mapa de la línia ${line.name}`}>
        <LineMapWrapper stations={stations} lineColor={line.color} lineName={line.name} />
      </section>

      {/* Tabla de estaciones */}
      <Card className="shadow-lg overflow-hidden py-0 gap-0">
        <CardHeader className="bg-gray-50 border-b py-4 px-6">
          <CardTitle className="text-lg">Estacions de la línia</CardTitle>
          <CardDescription>
            Llistat ordenat de totes les estacions
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <StationsTable stations={stations} lineColor={line.color} lineCode={line.code} />
        </CardContent>
      </Card>
    </div>
  );
}
