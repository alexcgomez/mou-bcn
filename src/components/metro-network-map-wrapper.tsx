"use client";

import dynamic from "next/dynamic";
import type { MetroLineWithStations } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

const MetroNetworkMap = dynamic(
  () => import("./metro-network-map").then((mod) => ({ default: mod.MetroNetworkMap })),
  {
    loading: () => <Skeleton className="h-[500px] w-full rounded-xl" />,
    ssr: false,
  }
);

interface MetroNetworkMapWrapperProps {
  lines: MetroLineWithStations[];
}

export function MetroNetworkMapWrapper({ lines }: MetroNetworkMapWrapperProps) {
  return <MetroNetworkMap lines={lines} />;
}
