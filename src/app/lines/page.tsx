import Link from "next/link";
import { getMetroLines } from "@/lib/tmb-api";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function LinesPage() {
  const lines = await getMetroLines();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Línies de Metro</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Línia</TableHead>
              <TableHead>Origen</TableHead>
              <TableHead>Destí</TableHead>
              <TableHead>Estacions</TableHead>
              <TableHead className="text-right">Acció</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lines.map((line) => (
              <TableRow key={line.id}>
                <TableCell>
                  <Badge
                    style={{
                      backgroundColor: line.color,
                      color: "white",
                    }}
                    className="font-bold text-sm px-3 py-1"
                  >
                    {line.name}
                  </Badge>
                </TableCell>
                <TableCell>{line.origin}</TableCell>
                <TableCell>{line.destination}</TableCell>
                <TableCell>{line.stationsCount}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/lines/${line.code}`}>
                    <Button variant="outline" size="sm">
                      Veure estacions
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
