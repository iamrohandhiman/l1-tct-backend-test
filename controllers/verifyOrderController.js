import { Order } from "../model/Order.js";
import dotenv from "dotenv";
dotenv.config();
import { razorpay } from "../config/Payments/razorpay.js";
import { validateWebhookSignature } from "razorpay/dist/utils/razorpay-utils.js";
import {
  updateInvestorDetails,
  UpdateInvestorSubscription,
} from "../services/i-informationServices.js";

export const verifyOrderController = async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const secret = razorpay.key_secret;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  try {
    const isValidSignature = validateWebhookSignature(
      body,
      razorpay_signature,
      secret
    );
    if (isValidSignature) {
     
      const updatedOrder = await Order.findOneAndUpdate(
        { id: razorpay_order_id },
        {
          status: "paid",
          payment_id: razorpay_payment_id,
        },
        { new: true }
      );
      const userId = updatedOrder.userId;
      if (updatedOrder) {
        const now = new Date();
        const subscriptionEnd = new Date(); // Current date and time
subscriptionEnd.setSeconds(subscriptionEnd.getSeconds() + 30); // Adding 30 seconds

// Now use this `subscriptionEnd` wherever it's needed

        const data = await UpdateInvestorSubscription(
          userId,
          "plus",
          true,
          now,
          subscriptionEnd
        );
        console.log(data)

        res.status(200).json({ status: "ok", order: updatedOrder });
        console.log("Payment verification successful");
      } else {
        res.status(404).json({ status: "order_not_found" });
        console.log("Order not found");
      }
    } else {
      res.status(400).json({ status: "verification_failed" });
      console.log("Payment verification failed");
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "error", message: "Error verifying payment" });
  }
};
