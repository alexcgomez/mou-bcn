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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface PageProps {
  params: Promise<{ code: string }>;
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
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Link href="/lines">
          <Button variant="ghost" size="sm">
            ← Tornar
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Badge
              style={{
                backgroundColor: line.color,
                color: "white",
              }}
              className="font-bold text-lg px-4 py-2"
            >
              {line.name}
            </Badge>
            <div>
              <CardTitle>{line.description}</CardTitle>
              <CardDescription>
                {line.origin} → {line.destination}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">#</TableHead>
                <TableHead>Estació</TableHead>
                <TableHead>Origen</TableHead>
                <TableHead>Destí</TableHead>
                <TableHead>Estat</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stations.map((station, index) => (
                <TableRow key={station.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-semibold">{station.name}</TableCell>
                  <TableCell>{station.origin}</TableCell>
                  <TableCell>{station.destination}</TableCell>
                  <TableCell>
                    <Badge
                      variant={station.status === "En servei" ? "default" : "secondary"}
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
