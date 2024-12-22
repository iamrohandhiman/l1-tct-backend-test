import { checkSchema } from "express-validator";

const allowedFileNames = ["logo","companyPan", "certificateOfIncorporation", "auditedFinancials","mis","buisnessProjections","capTable","unitEconomics","accountReceivables","GST3B","bankStatements","loanTracker","teamSizeProfiles","addressContract"];
const allowedTypes = ["logo","document","fundingDocument"];

export const validateFileNameSchema = checkSchema({
  fileName: {
    in: ["body"], 
    isString: {
      errorMessage: "fileName must be a string",
    },
    isIn: {
      options: [allowedFileNames], 
      errorMessage: `fileName not allowed}`,
    },
    trim: true, 
    notEmpty: {
      errorMessage: "fileName cannot be empty",
    },
  },

  type: {
    in: ["body"], 
    isString: {
      errorMessage: "type must be a string",
    },
    isIn: {
      options: [allowedTypes], 
      errorMessage: `Type not allowed}`,
    },
    trim: true, 
    notEmpty: {
      errorMessage: "Type cannot be empty",
    },
  },
});
