"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter } from "lucide-react";

interface AccessibilityFilterProps {
  totalStations: number;
  accessibleStations: number;
  onFilterChange: (showOnlyAccessible: boolean) => void;
}

export function AccessibilityFilter({
  totalStations,
  accessibleStations,
  onFilterChange,
}: AccessibilityFilterProps) {
  const [showOnlyAccessible, setShowOnlyAccessible] = useState(false);

  const handleToggle = () => {
    const newValue = !showOnlyAccessible;
    setShowOnlyAccessible(newValue);
    onFilterChange(newValue);
  };

  const accessibilityPercentage = Math.round(
    (accessibleStations / totalStations) * 100
  );

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
      <Button
        variant={showOnlyAccessible ? "default" : "outline"}
        size="sm"
        onClick={handleToggle}
        className="gap-2 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
        aria-label={
          showOnlyAccessible
            ? "Mostrar totes les estacions"
            : "Mostrar només estacions accessibles"
        }
      >
        <Filter className="w-4 h-4" aria-hidden="true" />
        {showOnlyAccessible ? "Mostrar totes" : "Només accessibles"}
      </Button>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Badge
          variant="outline"
          className="bg-blue-50 text-blue-700 border-blue-200"
        >
          {accessibleStations} accessibles
        </Badge>
        <span className="text-gray-500">
          ({accessibilityPercentage}% de {totalStations})
        </span>
      </div>
    </div>
  );
}
