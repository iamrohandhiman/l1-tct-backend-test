import { checkSchema } from 'express-validator';
import mongoose from 'mongoose';

const validateInvestorOffer = checkSchema({

  offerTo: {
    in: ['body'],
    isMongoId: {
      errorMessage: 'offerTo must be a valid MongoDB ObjectId',
    },
    notEmpty: {
      errorMessage: 'offerTo is required',
    },
  },
  description: {
    in: ['body'],
    optional: true,
    isString: {
      errorMessage: 'description must be a string',
    },
    isLength: {
      options: { max: 500 },
      errorMessage: 'description cannot exceed 500 characters',
    },
  },
  accepted: {
    in: ['body'],
    isBoolean: {
      errorMessage: 'accepted must be a boolean value',
    },
    optional: {
      options: { nullable: true },
    },
  },
});

export default validateInvestorOffer;
