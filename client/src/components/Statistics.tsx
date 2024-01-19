import { useSearchParams } from "react-router-dom";
import { getMonth } from "../utils/getMonth";

type StatisticsType = {
  totalSale: number;
  totalSoldItem: number;
  totalNotSoldItem: number;
};

export default function Statistics({
  statistics,
}: {
  statistics: StatisticsType;
}) {
  const [searchParams] = useSearchParams();

  return (
    <div className="d-flex flex-column gap-3 my-4">
      <h3>Statistics - {getMonth(searchParams.get("selectedMonth") || 2)}</h3>
      <div className="card text-bg-success mb-3" style={{ maxWidth: "18rem" }}>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <span>Total sale</span>
            <span>{statistics.totalSale}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Total sold item</span>
            <span>{statistics.totalSoldItem}</span>
          </div>
          <div className="d-flex justify-content-between">
            <span>Total not sold item</span>
            <span>{statistics.totalNotSoldItem}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
