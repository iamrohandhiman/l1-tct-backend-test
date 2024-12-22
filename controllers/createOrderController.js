import { razorpay } from "../config/Payments/razorpay.js";
import { matchedData,validationResult } from "express-validator";
import { Order } from "../model/Order.js";

export const createOrderController = async (req, res, next) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    try {
      // const { amount, currency, receipt, notes } = req.body;
      const data = matchedData(req)
      const userId = data.userId
      
      const options = {
        amount: data.amount * 100,
        currency:data.currency,
        receipt:data.receipt,
        notes:data.notes,
      };
      console.log(options)

      const order = await razorpay.orders.create(options);
      console.log(order);
      await Order.create({userId,...order});

      res.json(order);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error creating order");
    }
  } else {
    res.status(400).json({ msg: "invalid data" });
  }
};
