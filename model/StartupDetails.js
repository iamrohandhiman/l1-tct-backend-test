import mongoose from "mongoose";

const { Schema, model } = mongoose;


const StartupDetailsSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "StartupCredentials", 
    unique: true,
  },
  startupDetails: {
    businessName: { type: String, required: true },
    registeredName: { type: String, required: true },
    website: { type: String, required: true },
    sector: { type: String, required: true },
    stage: { type: String, required: true },
    dateOfIncorporation: { type: Date, required: true },
    detailsAboutCompany: { type: String, required: true },
  },
  founder: {
    name: { type: String, required: true },
    gender: { type: String, required: true },
    contactDetails:{
      emailId: { type: String, required: true },
      phoneNo: { type: String, required: true },
      linkedinProfile: { type: String, required: true },
    },
    city: { type: String, required: true },
  },
  cofounders: [
    {
      name: { type: String, required: true },
      gender: { type: String, required: true },
      contactDetails:{
        emailId: { type: String, required: true },
        phoneNo: { type: String, required: true },
        linkedinProfile: { type: String, required: true },
      },
      city: { type: String, required: true },
    },
  ],
  documents: {
    companyPan: {
      key: { type: String,  },
      type: { type: String, default: "PDF" },
      uploaded:{type:Boolean ,default:false}
    },
    certificateOfIncorporation: {
      key: { type: String,  },
      type: { type: String, default: "PDF" },
      uploaded:{type:Boolean ,default:false}
    },
    auditedFinancials: {
      key: { type: String  },
      type: { type: String,  default: "PDF" },
      uploaded:{type:Boolean ,default:false}
    },
    mis: {
      key: { type: String,  },
      type: { type: String,  default: "PDF" },
      uploaded:{type:Boolean ,default:false}
    },
    businessProjections: {
      key: { type: String,  },
      type: { type: String, default: "PDF" },
      uploaded:{type:Boolean ,default:false}
    },
    
    logo: {
      key: { type: String,  },
      type: { type: String, default: "PDF" },
      uploaded:{type:Boolean ,default:false}
    }
  },

  fundingDocuments: {
    capTable: {
      key: { type: String,  },
      type: { type: String, default: "PDF" },
      uploaded:{type:Boolean ,default:false}
    },
    unitEconomics: {
      key: { type: String,  },
      type: { type: String, default: "PDF" },
      uploaded:{type:Boolean ,default:false}
    },
    accountReceivables: {
      key: { type: String  },
      type: { type: String,  default: "PDF" },
      uploaded:{type:Boolean ,default:false}
    },
    GST3B: {
      key: { type: String,  },
      type: { type: String,  default: "PDF" },
      uploaded:{type:Boolean ,default:false}
    },
    bankStatements: {
      key: { type: String,  },
      type: { type: String, default: "PDF" },
      uploaded:{type:Boolean ,default:false}
    },
    
    loanTracker: {
      key: { type: String,  },
      type: { type: String, default: "PDF" },
      uploaded:{type:Boolean ,default:false}
    },

    teamSizeProfiles: {
      key: { type: String,  },
      type: { type: String, default: "PDF" },
      uploaded:{type:Boolean ,default:false}
    },
  
    addressContract: {
      key: { type: String,  },
      type: { type: String, default: "PDF" },
      uploaded:{type:Boolean ,default:false}
    }
  },

  financialDetails:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "StartupFinance", 
    default: null,
  },

  InvestorOffers:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "InvestorOffers", 
    unique: true,
    default: null,
  }
 ],

  fundingRequest: {
    requestType: {
      type: String,
      enum: ["equity", "debt", "A/M"],
    },
    amountRequested: { type: Number },
    valuationRange:{type:Number},
    reasonForFunding: { type: String },  
    requestedAt: {
      type: Date,
      default: Date.now,
    },
  },

  RecivedOffers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'InvestorOffers'
  }],

  hasfilledStartupDetails: { type: Boolean, default: false },
  hasfilledDocuments: { type: Boolean, default: false },
  hasfilledFinancialDetails: { type: Boolean, default: false },
  hasfilledFundingRequest: { type: Boolean, default: false },

 
});


export const StartupDetails = model("StartupDetails", StartupDetailsSchema);

