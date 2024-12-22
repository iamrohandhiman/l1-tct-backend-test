import { checkSchema } from "express-validator";

export const orderValidationSchema = checkSchema({
  amount: {
    in: ['body'],
    isInt: {
      errorMessage: 'Amount must be an integer.',
    },
    toInt: true,
    custom: {
      options: (value) => value > 0,
      errorMessage: 'Amount must be greater than zero.',
    },
  },
  currency: {
    in: ['body'],
    isString: {
      errorMessage: 'Currency must be a string.',
    },
    isLength: {
      options: { min: 3, max: 3 },
      errorMessage: 'Currency must be a valid 3-letter ISO code.',
    },
  },
  receipt: {
    in: ['body'],
    isString: {
      errorMessage: 'Receipt must be a string.',
    },
    isLength: {
      options: { min: 1 },
      errorMessage: 'Receipt cannot be empty.',
    },
  },
  userId: {
    in: ['body'],
    optional: true,
    isString: {
      errorMessage: 'UserId must be a string.',
    },
  },
  type: {
    in: ['body'],
    optional: true,
    isString: {
      errorMessage: 'Type must be a string.',
    },
    isIn: {
      options: [['subscription', 'one-time']],
      errorMessage: 'Type must be either "subscription" or "one-time".',
    },
  },
  expiry: {
    in: ['body'],
    optional: true,
    isISO8601: {
      errorMessage: 'Expiry must be a valid ISO8601 date string.',
    },
    toDate: true,
  },
});

