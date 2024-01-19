import { PieChart } from "@mui/x-charts";
import { getMonth } from "../utils/getMonth";
import { useSearchParams } from "react-router-dom";

export default function PieGraph({ pieData }: { pieData: any }) {
  const [searchParams] = useSearchParams();

  return (
    <div>
      <h3>
        Pie Chart Statistics -{" "}
        {getMonth(searchParams.get("selectedMonth") || 2)}
      </h3>
      <PieChart
        series={[
          {
            data: pieData,
          },
        ]}
        width={600}
        height={300}
      />
    </div>
  );
}
