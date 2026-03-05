"use client";

import * as React from "react";
import { MiniAreaChart } from "@/components/shared/mini-area-chart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { HistoricalDataPoint } from "@/types";

interface HistoricalChartProps {
  data: HistoricalDataPoint[];
}

const TIME_RANGES = ["7D", "30D", "90D", "1Y"];

export function HistoricalChart({ data }: HistoricalChartProps) {
  const [activeRange, setActiveRange] = React.useState("30D");

  const filteredData = React.useMemo(() => {
    const now = new Date(data[data.length - 1]?.date || Date.now());
    let daysBack: number;

    switch (activeRange) {
      case "7D":
        daysBack = 7;
        break;
      case "30D":
        daysBack = 30;
        break;
      case "90D":
        daysBack = 90;
        break;
      case "1Y":
        daysBack = 365;
        break;
      default:
        daysBack = 30;
    }

    const cutoff = new Date(now);
    cutoff.setDate(cutoff.getDate() - daysBack);

    const filtered = data.filter((point) => new Date(point.date) >= cutoff);
    return filtered.length > 0 ? filtered : data;
  }, [data, activeRange]);

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <MiniAreaChart
          data={filteredData}
          height={220}
          color="#00D4AA"
          showGrid
          timeRanges={TIME_RANGES}
          activeRange={activeRange}
          onRangeChange={setActiveRange}
        />
      </CardContent>
    </Card>
  );
}
