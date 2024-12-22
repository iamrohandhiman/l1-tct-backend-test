import express from "express";
import startupDetailsValidation from "../schema/s-detailsValidation.js";
import { validateFileNameSchema } from "../schema/s-docFilenameValidation.js";
import { startupDetailsUpdateController } from "../controllers/s-detailsUpdateController.js";
import { startupDetailsUploadController } from "../controllers/s-detailsUploadController.js";
import { startupDetailsFetchController } from "../controllers/s-detailsFetchController.js";
import { MultipleStartupFetchController } from "../controllers/MultipleStartupFetchController.js";
import { StartupFileUploadController } from "../controllers/s-fileUploadController.js";
import { StartupFileFetchController } from "../controllers/s-fileFetchController.js";
import { StartupFileStatusUpdateController } from "../controllers/s-fileStatusUpdateController.js";
import { StartupFundRequestController } from "../controllers/s-fundRequestController.js";
import { StartupAuthentication } from "../middlewares/s-authentication.js";
import { fundingRequestValidationSchema } from "../schema/s-fundingRequestValidation.js";
import { startupCompleteDetailsFetchController } from "../controllers/s-CompleteDetailsFetchController.js";
import { matchedData } from "express-validator/lib/matched-data.js";
import { StartupDetails } from "../model/StartupDetails.js";
import { StartupFinance } from "../model/StartupFinance.js";
import { InvestorOffers } from "../model/InvestorOffers.js";
import { fetchStartupsPagination } from "../services/s-informationServices.js";
import {
  hasfilledFinancialDetails,
  hasfilledStartupDetails,
} from "../middlewares/s-stageCheck.js";
import { mixAuth } from "../middlewares/miXAuth.js";
import { InvestorAuthentication } from "../middlewares/i-authentication.js";
import { InvestorSubscriptionActiveSubCheck } from "../middlewares/i-subscriptionCheckMiddleware.js";
import { searchStartupController } from "../controllers/searchStartupController.js";

const router = express.Router();

//routes only accesible to the Startup
router.post(
  "/api/v1/startup/info/upload",
  StartupAuthentication,
  startupDetailsValidation,
  startupDetailsUploadController
);

router.post(
  "/api/v1/startup/info/update",
  StartupAuthentication,
  startupDetailsValidation,
  startupDetailsUpdateController
);

router.post(
  "/api/v1/startup/file/upload",
  StartupAuthentication,
  hasfilledStartupDetails,
  validateFileNameSchema,
  StartupFileUploadController
);

router.post(
  "/api/v1/startup/file/update/status",
  StartupAuthentication,
  validateFileNameSchema,
  hasfilledStartupDetails,
  StartupFileStatusUpdateController
);

router.post(
  "/api/v1/startup/fund-request",
  StartupAuthentication,
  hasfilledFinancialDetails,
  fundingRequestValidationSchema,
  StartupFundRequestController
);


router.post(
  "/api/v1/startup/file/:id",
  mixAuth,
  InvestorSubscriptionActiveSubCheck,
  validateFileNameSchema,
  StartupFileFetchController
);

router.get(
  "/api/v1/startup/info/:id",
  mixAuth,
  InvestorSubscriptionActiveSubCheck,
  startupDetailsFetchController
);

router.get(
  "/api/v1/startup/detailed/info",
  StartupAuthentication,
  startupCompleteDetailsFetchController
);

router.get(
  "/api/v1/startup/infos",
  InvestorAuthentication,
  MultipleStartupFetchController
);

router.post(
  "/api/v1/search",
  InvestorAuthentication,
  searchStartupController
);


export default router;
