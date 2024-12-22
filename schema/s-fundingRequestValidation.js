import { checkSchema } from "express-validator";

export const fundingRequestValidationSchema = checkSchema({
  "fundingRequest.requestType": {
    in: ["body"],
    isString: {
      errorMessage: "Request type must be a string",
    },
    isIn: {
      options: [["equity", "debt", "A/M"]],
      errorMessage: "Request type must be one of 'equity', 'debt', or 'A/M'",
    },
    notEmpty: {
      errorMessage: "Request type is required",
    },
  },
  "fundingRequest.amountRequested": {
    in: ["body"],
    isNumeric: {
      errorMessage: "Amount requested must be a number",
    },
    notEmpty: {
      errorMessage: "Amount requested is required",
    },
  },
  "fundingRequest.valuationRange": {
    in: ["body"],
    isNumeric: {
      errorMessage: "Valuation range must be a number",
    },
    optional: { options: { nullable: true } }, // Allow it to be omitted or null
  },
  "fundingRequest.reasonForFunding": {
    in: ["body"],
    isString: {
      errorMessage: "Reason for funding must be a string",
    },
    notEmpty: {
      errorMessage: "Reason for funding is required",
    },
  },
});
