import React from "react";
import { BarChart } from "@/components/ui/chart";

function DiagnosisTrends() {
  const chartData = [
    { name: "Jan", value: 0.2 },
    { name: "Feb", value: 0.3 },
    { name: "Mar", value: 0.4 },
    { name: "Apr", value: 0.3 },
    { name: "May", value: 0.5 },
  ];

  return (
    <div>
      <div className="h-[200px]">
        <BarChart
          data={chartData}
          index="name"
          categories={["value"]}
          colors={["#10b981"]}
          valueFormatter={(value) => `${value * 100}%`}
          yAxisWidth={40}
        />
      </div>
      <div className="text-xs text-muted-foreground text-center mt-2">
        Risk Assessment Score Trend (Last 5 Months)
      </div>
    </div>
  );
}

export default DiagnosisTrends;
