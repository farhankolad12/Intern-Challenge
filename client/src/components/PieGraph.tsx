// import { useSearchParams } from "react-router-dom";
// import { useGetReq } from "../hooks/useGetReq";
import { PieChart } from "@mui/x-charts";

export default function PieGraph({ pieData }: { pieData: any }) {
  return (
    <div>
      <h3>Pie Chart Statistics </h3>
      <PieChart
        series={[
          {
            data: pieData,
          },
        ]}
        width={400}
        height={200}
      />
    </div>
  );
}
