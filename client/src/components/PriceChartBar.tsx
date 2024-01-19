import { BarChart } from "@mui/x-charts";

export default function PriceChartBar({ data }: { data: any }) {
  return (
    <div className="w-100 h-100">
      <BarChart
        height={300}
        series={[
          {
            data: data.map((item: any) => item.count),
            label: "Number of items",
          },
        ]}
        xAxis={[
          { data: data.map((item: any) => item.range), scaleType: "band" },
        ]}
      />
    </div>
  );
}
