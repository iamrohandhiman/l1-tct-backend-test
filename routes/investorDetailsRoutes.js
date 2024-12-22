import express from "express";
import validateInvestorDetails from "../schema/i-detailsValidation.js";
import { InvestorDetailsUpdateController } from "../controllers/i-detailsUpdateController.js";
import { InvestorDetailsUploadController } from "../controllers/i-detailsUploadController.js";
import { InvestorAuthentication } from "../middlewares/i-authentication.js";
import { InvestorBookmarkUpdate } from "../controllers/i-bookmarkUpdateController.js";
import { InvestorBookmarkFetch } from "../controllers/i-bookmarkFetchController.js";
import { InvestorBookmarkValidation } from "../schema/i-bookmarkValidation.js";
import { InvestorDetailsFetchController } from "../controllers/i-detailsFetchController.js";
import { InvestorCompleteDetailsFetchController } from "../controllers/i-detailsCompleteFetchController.js";
import { InvestorBookmarkRemove } from "../controllers/i-bookmarkRemoveController .js";

const router = express.Router();

router.post(
  "/api/v1/investor/upload/info",
  InvestorAuthentication,
  validateInvestorDetails,
  InvestorDetailsUploadController
);

router.post(
  "/api/v1/investor/fetch/info",
  InvestorAuthentication,
  InvestorDetailsFetchController
)

router.post(
  "/api/v1/investor/detailed/fetch/info",
  InvestorAuthentication,
  InvestorCompleteDetailsFetchController
)

router.patch(
  "/api/v1/investor/update/info",
  InvestorAuthentication,
  validateInvestorDetails,
  InvestorDetailsUpdateController
);

router.post(
  "/api/v1/investor/bookmark",
  InvestorAuthentication,
  InvestorBookmarkValidation,
  InvestorBookmarkUpdate,
)

router.post(
  "/api/v1/investor/delete/bookmark",
  InvestorAuthentication,
  InvestorBookmarkValidation,
  InvestorBookmarkRemove,
)

router.get(
  "/api/v1/investor/bookmark", 
  InvestorAuthentication,
  InvestorBookmarkFetch,
)



export default router;
