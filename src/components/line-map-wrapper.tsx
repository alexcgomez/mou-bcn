"use client";

import dynamic from "next/dynamic";
import type { MetroStation } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

const LineMap = dynamic(
  () => import("./line-map").then((mod) => ({ default: mod.LineMap })),
  {
    loading: () => <Skeleton className="h-[400px] w-full rounded-xl" />,
    ssr: false,
  }
);

interface LineMapWrapperProps {
  stations: MetroStation[];
  lineColor: string;
  lineName: string;
}

export function LineMapWrapper({ stations, lineColor, lineName }: LineMapWrapperProps) {
  return <LineMap stations={stations} lineColor={lineColor} lineName={lineName} />;
}
