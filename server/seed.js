const connectDatabase = require("./config/connecDatabase");
const Transactions = require("./models/transactionsModel");
const dotenv = require("dotenv");

dotenv.config();

async function seedDatabase() {
  connectDatabase();

  const res = await fetch(
    "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
  );
  const data = await res.json();

  const newTransactions = data.map((transaction) => {
    const month = new Date(transaction.dateOfSale).getMonth();

    return { ...transaction, dateOfSale: month };
  });

  await Transactions.insertMany(newTransactions);
}

seedDatabase();
