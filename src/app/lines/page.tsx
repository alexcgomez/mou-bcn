import type { Metadata } from "next";
import Link from "next/link";
import { getMetroLines, getAllLinesWithStations } from "@/lib/tmb-api";
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
import { MetroNetworkMapWrapper } from "@/components/metro-network-map-wrapper";

export const metadata: Metadata = {
  title: "Línies de Metro",
  description: "Consulta totes les línies del metro de Barcelona i les seves estacions. Visualitza la xarxa completa del metro de TMB.",
  openGraph: {
    title: "Línies de Metro - MouBCN",
    description: "Consulta totes les línies del metro de Barcelona i les seves estacions",
    url: "/lines",
  },
  twitter: {
    title: "Línies de Metro - MouBCN",
    description: "Consulta totes les línies del metro de Barcelona i les seves estacions",
  },
};

export default async function LinesPage() {
  const [lines, linesWithStations] = await Promise.all([
    getMetroLines(),
    getAllLinesWithStations(),
  ]);

  return (
    <div className="space-y-6">
      <header className="text-center sm:text-left">
        <h1 className="text-3xl font-bold text-gray-900">Línies de Metro</h1>
        <p className="mt-2 text-gray-600">
          Consulta totes les línies del metro de Barcelona i les seves estacions
        </p>
      </header>

      {/* Mapa de la xarxa de metro */}
      <section aria-label="Mapa de la xarxa de metro">
        <MetroNetworkMapWrapper lines={linesWithStations} />
      </section>

      <Card className="shadow-lg overflow-hidden py-0 gap-0">
        <CardHeader className="bg-gray-50 border-b py-4 px-6">
          <CardTitle className="text-lg">Xarxa de Metro</CardTitle>
          <CardDescription>
            {lines.length} línies disponibles
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100 hover:bg-gray-100">
                <TableHead className="w-24 font-semibold bg-gray-100" scope="col">Línia</TableHead>
                <TableHead className="font-semibold bg-gray-100" scope="col">Origen</TableHead>
                <TableHead className="font-semibold bg-gray-100" scope="col">Destí</TableHead>
                <TableHead className="text-right font-semibold w-44 bg-gray-100" scope="col">Acció</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lines.map((line) => (
                <TableRow key={line.id} className="hover:bg-gray-50 transition-colors">
                  <TableCell className="py-3">
                    <Badge
                      style={{
                        backgroundColor: line.color,
                        color: "white",
                      }}
                      className="font-bold text-sm px-3 py-1.5 shadow-sm"
                      aria-label={`Línia ${line.name}`}
                    >
                      {line.name}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-gray-900 py-3">{line.origin}</TableCell>
                  <TableCell className="text-gray-700 py-3">{line.destination}</TableCell>
                  <TableCell className="text-right py-3">
                    <Link href={`/lines/${line.code}`}>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                        aria-label={`Veure estacions de la línia ${line.name}`}
                      >
                        Veure estacions →
                      </Button>
                    </Link>
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
