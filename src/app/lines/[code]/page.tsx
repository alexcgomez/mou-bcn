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
      <div className="flex items-center justify-between">
        <Link href="/lines">
          <Button variant="outline" size="sm" className="gap-2">
            <span>←</span>
            <span>Tornar a línies</span>
          </Button>
        </Link>
      </div>

      {/* Header de la línea */}
      <div 
        className="rounded-xl p-6 text-white shadow-lg"
        style={{ backgroundColor: line.color }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur">
            <span className="text-3xl font-bold">{line.name}</span>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold">{line.description}</h1>
            <p className="mt-2 text-white/90 text-lg">
              {line.origin} → {line.destination}
            </p>
            <div className="mt-3 flex items-center gap-4">
              <span className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                {stations.length} estacions
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mapa de la línea */}
      <LineMapWrapper stations={stations} lineColor={line.color} lineName={line.name} />

      {/* Tabla de estaciones */}
      <Card className="shadow-lg overflow-hidden py-0 gap-0">
        <CardHeader className="bg-gray-50 border-b py-4 px-6">
          <CardTitle className="text-lg">Estacions de la línia</CardTitle>
          <CardDescription>
            Llistat ordenat de totes les estacions
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100 hover:bg-gray-100">
                <TableHead className="w-16 font-semibold text-center bg-gray-100">#</TableHead>
                <TableHead className="font-semibold bg-gray-100">Estació</TableHead>
                <TableHead className="font-semibold hidden sm:table-cell bg-gray-100">Origen servei</TableHead>
                <TableHead className="font-semibold hidden sm:table-cell bg-gray-100">Destí servei</TableHead>
                <TableHead className="font-semibold text-center w-28 bg-gray-100">Estat</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stations.map((station, index) => (
                <TableRow key={station.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell className="text-center py-3">
                    <span 
                      className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold"
                      style={{ backgroundColor: line.color }}
                    >
                      {index + 1}
                    </span>
                  </TableCell>
                  <TableCell className="font-semibold text-gray-900 py-3">{station.name}</TableCell>
                  <TableCell className="text-gray-600 hidden sm:table-cell py-3">{station.origin}</TableCell>
                  <TableCell className="text-gray-600 hidden sm:table-cell py-3">{station.destination}</TableCell>
                  <TableCell className="text-center py-3">
                    <Badge
                      variant={station.status === "En servei" ? "default" : "secondary"}
                      className={station.status === "En servei" ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
                    >
                      {station.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
