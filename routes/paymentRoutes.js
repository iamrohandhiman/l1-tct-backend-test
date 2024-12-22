import express from "express"
import { createOrderController } from "../controllers/createOrderController.js"
import { verifyOrderController } from "../controllers/verifyOrderController.js"
import { InvestorAuthentication } from "../middlewares/i-authentication.js"
import { PaymentActiveSubCheck } from "../middlewares/i-paymentActiveSubCheck.js"
import { orderValidationSchema } from "../schema/i-orderSchemaValidation.js"
import { fetchOrdersController } from "../controllers/fetchOrdersController.js"
const router = express.Router()

router.post("/api/v1/investor/create-order",
  orderValidationSchema,
  PaymentActiveSubCheck,
  createOrderController
)


router.post("/api/v1/investor/verify-payment",
  verifyOrderController
)

router.post("/api/v1/investor/orders",
   InvestorAuthentication,
   fetchOrdersController
)
  

export default router