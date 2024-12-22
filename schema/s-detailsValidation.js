import { checkSchema } from 'express-validator';

const startupDetailsValidation = checkSchema({
  userId: {
    in: ['body'],
    isMongoId: true,
    optional: true, 
  },
  startupDetails: {
    in: ['body'],
    isObject: true,
    optional: true, 
  },
  'startupDetails.businessName': {
    in: ['body'],
    isString: true,
    optional: true, 
  },
  'startupDetails.registeredName': {
    in: ['body'],
    isString: true,
    optional: true, 
  },
  'startupDetails.website': {
    in: ['body'],
    isString: true,
    optional: true, 
  },
  'startupDetails.sector': {
    in: ['body'],
    isString: true,
    optional: true, 
  },
  'startupDetails.stage': {
    in: ['body'],
    isString: true,
    optional: true, 
  },
  'startupDetails.dateOfIncorporation': {
    in: ['body'],
    isDate: true,
    optional: true, 
  },
  'startupDetails.detailsAboutCompany': {
    in: ['body'],
    isString: true,
    optional: true, 
  },
  founder: {
    in: ['body'],
    isObject: true,
    optional: true, 
  },
  'founder.name': {
    in: ['body'],
    isString: true,
    optional: true, 
  },
  'founder.gender': {
    in: ['body'],
    isString: true,
    optional: true, 
  },
  'founder.emailId': {
    in: ['body'],
    isEmail: true,
    optional: true, 
  },
  'founder.phoneNo': {
    in: ['body'],
    isString: true,
    optional: true, 
  },
  'founder.linkedinProfile': {
    in: ['body'],
    isString: true,
    optional: true, 
  },
  'founder.city': {
    in: ['body'],
    isString: true,
    optional: true, 
  },
  cofounders: {
    in: ['body'],
    isArray: true,
    optional: true, 
  },
  'cofounders.*.name': {
    in: ['body'],
    isString: true,
    optional: true, 
  },
  'cofounders.*.gender': {
    in: ['body'],
    isString: true,
    optional: true, 
  },
  'cofounders.*.emailId': {
    in: ['body'],
    isEmail: true,
    optional: true, 
  },
  'cofounders.*.phoneNo': {
    in: ['body'],
    isString: true,
    optional: true, 
  },
  'cofounders.*.linkedinProfile': {
    in: ['body'],
    isString: true,
    optional: true, 
  },
  'cofounders.*.city': {
    in: ['body'],
    isString: true,
    optional: true, 
  },
  documents: {
    in: ['body'],
    isObject: true,
    optional: true, 
  },
  'documents.companyPan.key': {
    in: ['body'],
    isString: true,
    optional: true,
    default :null
  },
  'documents.companyPan.type': {
    in: ['body'],
    isString: true,
    optional: true, 
    isIn: {
      options: [['PDF']],
      errorMessage: 'Must be a PDF',
    },
  },
  'documents.certificateOfIncorporation.key': {
    in: ['body'],
    isString: true,
    optional: true, 
    default :null
  },
  'documents.certificateOfIncorporation.type': {
    in: ['body'],
    isString: true,
    optional: true, 
    isIn: {
      options: [['PDF']],
      errorMessage: 'Must be a PDF',
    },
  },
  'documents.auditedFinancials.key': {
    in: ['body'],
    isString: true,
    optional: true, 
    default :null
  },
  'documents.auditedFinancials.type': {
    in: ['body'],
    isString: true,
    optional: true, 
    isIn: {
      options: [['PDF']],
      errorMessage: 'Must be a PDF',
    },
  },
  'documents.mis.key': {
    in: ['body'],
    isString: true,
    optional: true, 
    default :null
  },
  'documents.mis.type': {
    in: ['body'],
    isString: true,
    optional: true, 
    isIn: {
      options: [['PDF']],
      errorMessage: 'Must be a PDF',
    },
  },
  'documents.businessProjections.key': {
    in: ['body'],
    isString: true,
    optional: true, 
    default :null
  },
  'documents.businessProjections.type': {
    in: ['body'],
    isString: true,
    optional: true, 
    isIn: {
      options: [['PDF']],
      errorMessage: 'Must be a PDF',
    },
  },
  fundingRequest: {
    in: ['body'],
    isObject: true,
    optional: true, 
  },
  'fundingRequest.requestType': {
    in: ['body'],
    isString: true,
    optional: true, 
    isIn: {
      options: [['equity', 'debt', 'A/M']],
      errorMessage: 'Invalid request type',
    },
  },
  'fundingRequest.amountRequested': {
    in: ['body'],
    isNumeric: true,
    optional: true, 
  },
  'fundingRequest.reasonForFunding': {
    in: ['body'],
    isString: true,
    optional: true, 
  },
  'fundingRequest.stageOfRequest': {
    in: ['body'],
    isString: true,
    optional: true, 
    isIn: {
      options: [['pending', 'approved']],
      errorMessage: 'Invalid stage',
    },
  },
  'fundingRequest.requestedAt': {
    in: ['body'],
    isDate: true,
    optional: true, 
  },
  hasfilledStartupDetails: {
    in: ['body'],
    isBoolean: true,
    optional: true, 
  },
  hasfilledDocuments: {
    in: ['body'],
    isBoolean: true,
    optional: true, 
  },
  hasfilledFinancialDetails: {
    in: ['body'],
    isBoolean: true,
    optional: true, 
  },
  hasfilledFundingRequest: {
    in: ['body'],
    isBoolean: true,
    optional: true, 
  },
});

export default startupDetailsValidation;
