import mongoose from "mongoose";

const StartupFinanceSchema = mongoose.Schema({
  Revenue: {
    type: Number,
    unique: true,
  },
});

export const StartupFinance= new mongoose.model(
  "StartupFinance",
  StartupFinanceSchema
);
