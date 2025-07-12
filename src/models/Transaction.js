import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    validate: {
      validator: function (value) {
        return value <= new Date(); // restricts to today or earlier
      },
      message: "Transaction date cannot be in the future.",
    },
  },
});

export default mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);
