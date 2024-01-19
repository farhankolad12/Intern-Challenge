const express = require("express");
const cors = require("cors");

const router = express.Router();

const {
  transactions,
  statistics,
  barGraph,
  combinedData,
  pieGraph,
} = require("../controller/transactions");

router.use(
  cors({
    origin: [process.env.REACT_APP_URL],
  })
);

router.route("/transactions").get(transactions);
router.route("/statistics").get(statistics);
router.route("/bar-graph").get(barGraph);
router.route("/pie-graph").get(pieGraph);
router.route("/combined-data").get(combinedData);

module.exports = router;
