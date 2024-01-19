const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  title: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  image: {
    type: String,
  },
  sold: {
    type: Boolean,
  },
  dateOfSale: {
    type: Number,
  },
});

module.exports = mongoose.model("Transactions", transactionSchema);
