import express from "express";
import { investorValidationSchema } from "../schema/i-signupValidation.js";
import { investorSignupController } from "../controllers/i-signupController.js";
import { checkInvestorLoginStatus } from "../middlewares/i-loginStatusCheckMiddleware.js";
import { loginValidationSchema } from "../schema/i-loginValidation.js";
import { investorLoginController } from "../controllers/i-loginController.js";
import { InvestorAuthentication } from "../middlewares/i-authentication.js";
import { InvestorLogoutController } from "../controllers/i-logoutController.js";
const router = express.Router();

router.post(
  "/api/v1/investor/signup",
  investorValidationSchema,
  investorSignupController
);

router.post(
  "/api/v1/investor/login",
  loginValidationSchema,
  checkInvestorLoginStatus,
  investorLoginController
);

router.post("/api/v1/investor/logout",
  InvestorAuthentication,
  InvestorLogoutController
)


export default router;
