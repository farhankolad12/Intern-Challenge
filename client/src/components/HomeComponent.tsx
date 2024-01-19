// import { useState } from "react";
import Transactions from "./Transactions";
import AllStatistics from "./AllStatistics";

export default function HomeComponent() {
  return (
    <main className="container mt-5">
      <h1 className="text-center">Transaction Dashboard</h1>
      <Transactions />
      <AllStatistics />
    </main>
  );
}
