const express = require("express");
const app = express();
const dotenv = require("dotenv");

const connectDatabase = require("./config/connecDatabase");

dotenv.config();

connectDatabase();

// Import Routers
const transactions = require("./routes/transactionsRoute");

app.use("/api", transactions);

app.listen(4000);
