import { checkSchema } from 'express-validator';
import mongoose from 'mongoose';

const validateInvestorDetails = checkSchema({
  fullName: {
    in: ['body'],
    isString: true,
    notEmpty: true,
    errorMessage: 'Full name is required'
  },
  gender: {
    in: ['body'],
    isString: true,
    notEmpty: true,
    errorMessage: 'Gender is required'
  },
  number: {
    in: ['body'],
    isString: true,
    notEmpty: true,
    errorMessage: 'Number is required'
  },
  linkedinURL: {
    in: ['body'],
    optional: true,
    isURL: true,
    errorMessage: 'Invalid URL'
  },
  bestDescription: {
    in: ['body'],
    isString: true,
    isIn: {
      options: [['owner', 'professional', 'VC/PE professional', 'Angel', 'FO person', 'founder', 'accelator', 'student', 'other']],
    },
    errorMessage: 'Invalid best description',
  },
  experience: {
    in: ['body'],
    isString: true,
    isIn: {
      options: [['Early stage investor', 'Experienced in growth stage investment', 'Senior entrepreneur', 'Senior management experience of 10+ years']],
    },
    errorMessage: 'Invalid experience type',
  },
  asset: {
    in: ['body'],
    isNumeric: true,
  },
  address: {
    in: ['body'],
    isString: true,
    notEmpty: true,
    errorMessage: 'Address is required'
  },
  qualification: {
    in: ['body'],
    isString: true,
    notEmpty: true,
    errorMessage: 'Qualification is required'
  },
  pan: {
    in: ['body'],
    isString: true,
    notEmpty: true,
    errorMessage: 'PAN is required'
  },
  bookmarks: {
    in: ['body'],
    optional: true,
    isArray: true,
    custom: {
      options: async (value) => {
        for (const id of value) {
          const exists = await mongoose.models.StartupDetails.exists({ _id: id });
          if (!exists) {
            throw new Error('Invalid bookmark ID');
          }
        }
      }
    }
  },
  invested: {
    in: ['body'],
    optional: true,
    isArray: true,
    custom: {
      options: async (value) => {
        for (const id of value) {
          const exists = await mongoose.models.StartupDetails.exists({ _id: id });
          if (!exists) {
            throw new Error('Invalid invested ID');
          }
        }
      }
    }
  },
  offers: {
    in: ['body'],
    optional: true,
    isArray: true,
    custom: {
      options: async (value) => {
        for (const id of value) {
          const exists = await mongoose.models.InvestorOffers.exists({ _id: id });
          if (!exists) {
            throw new Error('Invalid offer ID');
          }
        }
      }
    }
  }
});

export default validateInvestorDetails;
