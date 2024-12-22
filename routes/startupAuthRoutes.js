import express from "express";
import {checkStartupLoginStatus} from "../middlewares/s-loginStatusCheckMiddleware.js"
import { startupSignupController } from "../controllers/s-signupController.js";
import { startupLoginController } from "../controllers/s-loginController.js";
import { startupLogoutController } from "../controllers/s-logoutController.js";
import {signupValidationSchema} from "../schema/s-signupValidation.js"
import { loginValidationSchema } from "../schema/s-loginValidation.js";
import { StartupAuthentication } from "../middlewares/s-authentication.js"
import { body, matchedData, validationResult } from "express-validator";
const router = express.Router();

router.post(
  "/api/v1/startup/signup",
  signupValidationSchema,
  startupSignupController
);

router.post(
  "/api/v1/startup/login",
  checkStartupLoginStatus,
  loginValidationSchema,
  startupLoginController
);

router.post("/api/v1/startup/logout",
  StartupAuthentication,
  startupLogoutController
)


export default router;
