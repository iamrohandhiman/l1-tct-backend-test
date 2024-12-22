import mongoose from "mongoose";

const InvestorOffersSchema = new mongoose.Schema({
  offerBy: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true ,
    unique:false
  },
  offerTo: {
    type: mongoose.Schema.Types.ObjectId,
    required: true ,
    unique:false
  },
  description: {
    type: String, 
    required: false ,
    unique:false,
  },
  accepted: {
    type: Boolean,  
    default: false ,
    unique:false
  },
  
});
InvestorOffersSchema.index({ offerBy: 1, offerTo: 1 }, { unique: true });

export const InvestorOffers = mongoose.model(
  "InvestorOffers",
  InvestorOffersSchema
);
