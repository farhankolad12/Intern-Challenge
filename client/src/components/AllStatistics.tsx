import Statistics from "./Statistics";
import BarGraph from "./BarGraph";
import PieGraph from "./PieGraph";
import { useGetReq } from "../hooks/useGetReq";
import { useSearchParams } from "react-router-dom";

export default function AllStatistics() {
  const [searchParams] = useSearchParams({
    selectedMonth: "2",
  });

  const { data, error, loading } = useGetReq(searchParams, "/combined-data");

  if (error) {
    alert(error);
    console.error(error);
  }

  return (
    <>
      {loading ? (
        "loading..."
      ) : data ? (
        <>
          <Statistics statistics={data.statistics} />
          <BarGraph priceRangeData={data.priceRangeData} />
          <PieGraph pieData={data.pieData} />
        </>
      ) : (
        "No"
      )}
    </>
  );
}
