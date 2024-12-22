import { InvestorDetails } from "../model/InvestorDetails.js"
import { InvestorOffers } from "../model/InvestorOffers.js"
import { StartupDetails } from "../model/StartupDetails.js"

 export const createOffer = async(userId, offerTo,description)=>{
  try{
   
    const offer = await InvestorOffers.create({offerBy:userId,offerTo,description})
   
   
    const offerId = offer._id
    const updatedInvestor = await InvestorDetails.findOneAndUpdate(
      {userId:userId},
      {$addToSet: {offers:offerId}}
    )

    const updatedStartup = await StartupDetails.findOneAndUpdate(
      {userId:offerTo},
      {$addToSet: {RecivedOffers:offerId}}
    )
  }
  catch(e){
    console.log(e)
    throw e
  }
 }

 

 export const updateAcceptOffer = async (userId, offerId) => {
  try {

    const startup = await StartupDetails.findOne({ userId }).select("RecivedOffers");
   
    if (!startup || !startup.RecivedOffers.includes(offerId)) {
      throw new Error("Offer not found in the startup's received offers.");
    }

    const acceptedOffer = await InvestorOffers.findOneAndUpdate(
      { _id: offerId },
      { $set: { accepted: true } },
      { new: true } 
    );

    if (!acceptedOffer) {
      throw new Error("Failed to update offer status to accepted.");
    }


    const updatedInvestor = await InvestorDetails.findOneAndUpdate(
      { userId: acceptedOffer.offerBy },
      { $addToSet: { invested: offerId } },
      { new: true } 
    );

    return { acceptedOffer, updatedInvestor };
  } catch (e) {
    console.error("Error updating and accepting offer:", e);
    throw e;
  }
};
