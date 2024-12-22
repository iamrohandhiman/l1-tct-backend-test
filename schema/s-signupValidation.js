import { checkSchema } from "express-validator";
export const signupValidationSchema = checkSchema({
  businessName: {
    isString: {
      errorMessage: "Business name must be a string",
    },
    notEmpty: {
      errorMessage: "Business name is required",
    },
  },
  email: {
    isEmail: {
      errorMessage: "Valid email is required",
    },
    normalizeEmail: true,
  },
  password: {
    isString: {
      errorMessage: "Password must be a string",
    },
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be at least 6 characters long",
    },
  },
  type: {
    isString: {
      errorMessage: "Type must be a string",
    },
    notEmpty: {
      errorMessage: "Type is required",
    },
  },
});