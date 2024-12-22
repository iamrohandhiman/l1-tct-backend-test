import mongoose from "mongoose";

const investorDetailsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InvestorCredentials',
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  },
  linkedinURL: {
    type: String
  },
  bestDescription: {
    type: String,
    enum: ['owner', 'professional', 'VC/PE professional', 'Angel', 'FO person', 'founder', 'accelator', 'student', 'other'],
    required: true
  },
  experience: {
    type: String,
    enum: ['Early stage investor', 'Experienced in growth stage investment', 'Senior entrepreneur', 'Senior management experience of 10+ years'],
    required: true
  },
  address: {
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  asset:{
    type:Number,
    required:true
  },
  pan: {
    type: String,
    required: true
  },
  company: {
    type: String
  },
  profileSummary: {
    type: String,
    maxlength: 200,
  },
  bookmarks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StartupDetails'
  }],
  invested: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StartupDetails'
  }],
  offers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InvestorOffers'
  }],

  subscriptionDetails: {
    type: {
      type: String,
      default: 'starter',
    },
    isActive: { 
      type: Boolean,
      default: false,
    },
    subscriptionStart: {
      type: Date,
      default: null,
    },
    subscriptionEnd: {
      type: Date,
      default: null,
    },
  }

});

export const InvestorDetails = mongoose.model('InvestorDetails', investorDetailsSchema);
