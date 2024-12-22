import { checkSchema } from 'express-validator';

export const InvestorBookmarkValidation = checkSchema({
  startupUserId: {
    in: ['body'],
    isMongoId: true,
    optional: true, 
  }
})

