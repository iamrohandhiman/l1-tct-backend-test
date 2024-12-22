import mongoose  from "mongoose"

const OrderSchema = new mongoose.Schema({
  userId:mongoose.Schema.Types.ObjectId,
  amount: Number,
  amount_due: Number,
  amount_paid: Number,
  attempts: Number,
  created_at: Number,
  currency: String,
  entity: String,
  id: String,
  notes: [],
  offer_id: String,
  receipt: String,
  status: String
})

export const Order = mongoose.model("Orders",OrderSchema)