const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const Transactions = require("../models/transactionsModel");

exports.transactions = catchAsyncErrors(async (req, res, next) => {
  const { query, selectedMonth } = req.query;

  const currentPage = Number(req.query.currentPage) || 1;
  const pageSize = 10;

  const totalTransactions = await Transactions.countDocuments({
    dateOfSale: +selectedMonth,
    $or: [
      { title: { $regex: query || "", $options: "i" } },
      { description: { $regex: query || "", $options: "i" } },
      isNaN(+query)
        ? { title: { $regex: query || "", $options: "i" } }
        : { price: +query },
    ],
  });

  const transactions = await Transactions.find({
    dateOfSale: +selectedMonth,
    $or: [
      { title: { $regex: query || "", $options: "i" } },
      { description: { $regex: query || "", $options: "i" } },
      isNaN(+query)
        ? { title: { $regex: query || "", $options: "i" } }
        : { price: +query },
    ],
  })
    .limit(10)
    .skip(pageSize * (currentPage - 1));

  return res.status(200).json({
    totalPages: Math.ceil(totalTransactions / pageSize),
    transactions,
  });
});

exports.statistics = catchAsyncErrors(async (req, res, next) => {
  const { selectedMonth } = req.query;

  const transactions = await Transactions.find({
    dateOfSale: +selectedMonth,
  });

  let totalSale = 0;
  let totalSoldItem = 0;
  let totalNotSoldItem = 0;

  for (let i = 0; i < transactions.length; i++) {
    const transaction = transactions[i];

    if (transaction.sold) {
      totalSale += transaction.price;
      totalSoldItem++;
    } else {
      totalNotSoldItem++;
    }
  }

  return res.status(200).json({ totalNotSoldItem, totalSale, totalSoldItem });
});

exports.pieGraph = catchAsyncErrors(async (req, res, next) => {
  const { selectedMonth } = req.query;

  const transactionLists = await Transactions.find({
    dateOfSale: +selectedMonth,
  }).sort({ price: 1 });

  let pieData = [];

  for (let i = 0; i < transactionLists.length; i++) {
    const transaction = transactionLists[i];

    if (pieData.some((d) => d.label === transaction.category)) {
      pieData = pieData.map((d) => {
        if (d.label === transaction.category) {
          return {
            label: transaction.category,
            value: ++d.value,
            id: transaction.id,
          };
        }

        return d;
      });
    } else {
      pieData.push({
        label: transaction.category,
        value: 1,
        id: transaction.id,
      });
    }
  }

  return res.status(200).json(pieData);
});

exports.barGraph = catchAsyncErrors(async (req, res, next) => {
  const { selectedMonth } = req.query;

  const transactionLists = await Transactions.find({
    dateOfSale: +selectedMonth,
  }).sort({ price: 1 });

  // Define price ranges
  const priceRanges = [
    { min: 0, max: 100 },
    { min: 101, max: 200 },
    { min: 201, max: 300 },
    { min: 301, max: 400 },
    { min: 401, max: 500 },
    { min: 501, max: 600 },
    { min: 601, max: 700 },
    { min: 701, max: 800 },
    { min: 801, max: 900 },
    { min: 901, max: Number.MAX_SAFE_INTEGER },
  ];

  const priceRangeCounts = {};

  for (let i = 0; i < transactionLists.length; i++) {
    const item = transactionLists[i];
    const { price } = item;

    const range = priceRanges.find(
      (range) => price >= range.min && price < range.max
    );

    if (range) {
      const rangeKey = `${range.min}-${range.max}`;
      priceRangeCounts[rangeKey] = (priceRangeCounts[rangeKey] || 0) + 1;
    }
  }

  // Convert the counts object to an array of objects
  const priceRangeData = Object.keys(priceRangeCounts).map((rangeKey) => {
    const [min, max] = rangeKey.split("-").map(Number);
    return {
      range: `${min}-${max}`,
      count: priceRangeCounts[rangeKey],
    };
  });

  return res.status(200).json(priceRangeData);
});

exports.combinedData = catchAsyncErrors(async (req, res, next) => {
  const res1 = await fetch(
    `http://localhost:4000/api/statistics${
      req.query ? "?" + new URLSearchParams(req.query) : ""
    }`,
    { method: "GET", headers: { "Content-Type": "application/json" } }
  );
  const data1 = await res1.json();

  const res2 = await fetch(
    `http://localhost:4000/api/bar-graph${
      req.query ? "?" + new URLSearchParams(req.query) : ""
    }`,
    { method: "GET", headers: { "Content-Type": "application/json" } }
  );
  const data2 = await res2.json();

  const res3 = await fetch(
    `http://localhost:4000/api/pie-graph${
      req.query ? "?" + new URLSearchParams(req.query) : ""
    }`,
    { method: "GET", headers: { "Content-Type": "application/json" } }
  );
  const data3 = await res3.json();

  const combinedData = {
    statistics: data1,
    priceRangeData: data2,
    pieData: data3,
  };

  return res.status(200).json(combinedData);
});
