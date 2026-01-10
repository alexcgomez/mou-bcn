import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LineDetailLoading() {
  return (
    <div className="space-y-4 pb-4">
      {/* Botón volver skeleton */}
      <Skeleton className="h-9 w-40" />

      {/* Header línea skeleton */}
      <Skeleton className="h-48 w-full rounded-xl" />

      {/* Mapa skeleton */}
      <Skeleton className="h-[400px] w-full rounded-xl" />

      {/* Tabla skeleton */}
      <Card className="shadow-lg overflow-hidden py-0 gap-0">
        <CardHeader className="bg-gray-50 border-b py-4 px-6">
          <Skeleton className="h-6 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-2 p-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 py-3 border-b">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-5 flex-1" />
                <Skeleton className="h-5 flex-1 hidden sm:block" />
                <Skeleton className="h-5 flex-1 hidden sm:block" />
                <Skeleton className="h-6 w-24" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
