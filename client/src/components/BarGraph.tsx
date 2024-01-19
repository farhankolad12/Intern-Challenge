import { useSearchParams } from "react-router-dom";
import { getMonth } from "../utils/getMonth";
import PriceChartBar from "./PriceChartBar";

export default function BarGraph({ priceRangeData }: { priceRangeData: any }) {
  const [searchParams] = useSearchParams();

  return (
    <div className="d-flex flex-column gap-3 my-4">
      <h3>
        Bar Chart Statistics -{" "}
        {getMonth(searchParams.get("selectedMonth") || 2)}
      </h3>
      <PriceChartBar data={priceRangeData} />
    </div>
  );
}
