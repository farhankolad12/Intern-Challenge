import { useSearchParams } from "react-router-dom";
import { useGetReq } from "../hooks/useGetReq";
import { useDebouncedCallback } from "use-debounce";

export type TransactionType = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  sold: boolean;
  image: string;
};

export default function Transactions() {
  const [searchParams, setSearchParams] = useSearchParams({
    currentPage: "1",
    selectedMonth: "2",
  });

  const {
    data: transactionsList,
    error,
    loading,
  } = useGetReq(searchParams, "/transactions");

  if (error) {
    console.log(error);

    alert(error);
  }

  const debounced = useDebouncedCallback((val) => {
    searchParams.set("query", val);
    searchParams.set("currentPage", "1");
    setSearchParams(searchParams);
  }, 500);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center gap-5 my-4">
        <input
          type="text"
          id="query"
          placeholder="Search transaction"
          onChange={(e) => debounced(e.target.value)}
          defaultValue={searchParams.get("query") || ""}
          className="form-control w-100"
        />
        <select
          className="form-select w-auto"
          defaultValue={searchParams.get("selectedMonth") || "2"}
          name="month"
          id="month"
          onChange={(e) => {
            searchParams.set("selectedMonth", e.target.value);
            setSearchParams(searchParams);
          }}
        >
          <option value="0">January</option>
          <option value="1">Febuary</option>
          <option value="2">March</option>
          <option value="3">April</option>
          <option value="4">May</option>
          <option value="5">June</option>
          <option value="6">July</option>
          <option value="7">August</option>
          <option value="8">September</option>
          <option value="9">October</option>
          <option value="10">November</option>
          <option value="11">December</option>
        </select>
      </div>
      <div className="table-responsive">
        {loading ? (
          <h1 className="text-center">Loading...</h1>
        ) : transactionsList.transactions.length ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Sold</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {transactionsList.transactions.map(
                (transaction: TransactionType) => {
                  return (
                    <tr key={transaction.id}>
                      <td>{transaction.id}</td>
                      <td>{transaction.title}</td>
                      <td>{transaction.description}</td>
                      <td>{transaction.price}</td>
                      <td>{transaction.category}</td>
                      <td>{transaction.sold ? "Yes" : "No"}</td>
                      <td>
                        <img
                          src={transaction.image}
                          alt="Product"
                          width="100px"
                          height="100px"
                        />
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        ) : (
          "No Data to show"
        )}
        <div className="d-flex justify-content-between gap-2">
          <strong>Page No: {searchParams.get("currentPage")}</strong>
          <div className="d-flex gap-4">
            <button
              disabled={searchParams.get("currentPage") == "1"}
              onClick={() => {
                const currentPage = Number(searchParams.get("currentPage"));
                searchParams.set("currentPage", (currentPage - 1).toString());
                setSearchParams(searchParams);
              }}
              className="btn btn-outline-danger"
            >
              <i className="bi bi-chevron-left" />
            </button>
            <button
              disabled={
                transactionsList?.totalPages == 0 ||
                searchParams.get("currentPage") == transactionsList?.totalPages
              }
              onClick={() => {
                const currentPage = Number(searchParams.get("currentPage"));
                searchParams.set("currentPage", (currentPage + 1).toString());
                setSearchParams(searchParams);
              }}
              className="btn btn-outline-danger"
            >
              <i className="bi bi-chevron-right" />
            </button>
          </div>
          <strong>Per page: 10</strong>
        </div>
      </div>
    </div>
  );
}
