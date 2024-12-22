import express from "express"
import { InvestorAuthentication } from "../middlewares/i-authentication.js"
import { InvestorSubscriptionActiveSubCheck } from "../middlewares/i-subscriptionCheckMiddleware.js"
import { createOfferController } from "../controllers/createOfferController.js"
import validateInvestorOffer from "../schema/offerValidation.js"
import { StartupAuthentication } from "../middlewares/s-authentication.js"
import offerIdValidation from "../schema/offerIdValidation.js"
import { acceptOfferController } from "../controllers/acceptOfferController.js"
const router = express.Router()

router.post("/api/v1/investor/create/offer",
  InvestorAuthentication,
  InvestorSubscriptionActiveSubCheck,
  validateInvestorOffer,
  createOfferController
)

//get offer details route
router.post("/api/v1/offer/details",
(req,res,next)=>{
  res.send("data")
})

router.post("/api/v1/accept/offer",
  StartupAuthentication,
  offerIdValidation,
  acceptOfferController
)

export default router