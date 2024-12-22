import { checkSchema } from 'express-validator';

const offerIdValidation = checkSchema({
  offerId: {
    in: ['body'],
    isMongoId: true,
    optional: true, 
  },

});

export default offerIdValidation;
