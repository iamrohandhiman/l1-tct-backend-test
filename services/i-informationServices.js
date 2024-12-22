import { StartupDetails } from "../model/StartupDetails.js";
import mongoose from "mongoose";
import { ValidationError, AuthenticationError, AuthorizationError, NotFoundError, ConflictError, DatabaseError } from "../utils/errors.js";
import { logger } from "../config/logger.js";
import { InvestorDetails } from "../model/InvestorDetails.js";



export const FetchInvestorSubscription = async(userId)=>{
  try {
   
    const InvestorSubscription = await InvestorDetails.findOne({userId:userId}).select("subscriptionDetails");

    return InvestorSubscription
  } catch (e) {
    
   throw e;
  }
}

export const FetchInvestorSubscriptionById = async(userId)=>{
  try {
   
    const InvestorSubscription = await InvestorDetails.findById(userId).select("subscriptionDetails");

    return InvestorSubscription
  } catch (e) {
    
   throw e;
  }
}





export const UpdateInvestorSubscription = async (userId, type, isActive, subscriptionStart, subscriptionEnd) => {
  try {
    const InvestorSubscription = await InvestorDetails.findOneAndUpdate(
      { userId: userId },
      {
        $set: {
          'subscriptionDetails.type': type,
          'subscriptionDetails.isActive': isActive,
          'subscriptionDetails.subscriptionStart': subscriptionStart,
          'subscriptionDetails.subscriptionEnd': subscriptionEnd,
        },
      },
      { new: true } 
    ).select('subscriptionDetails'); 

    return InvestorSubscription;
  } catch (e) {
    throw e; 
  }
};



export const uploadInvestorDetails = async (userId, data) => {
  try {
    
    const existingInvestor = await InvestorDetails.findOne({ userId });
    
    if (existingInvestor) {
      throw new ConflictError('Investor details already exist for this user.');
    }

    const investorData = {
      userId,
      ...data
    };

    const Investor = await InvestorDetails.create(investorData);
  } catch (e) {
   throw e;
  }
};


export const updateInvestorDetails = async (userId, data) => {
  try {
    const updatedInvestor = await InvestorDetails.findOneAndUpdate(
      { userId: userId }, 
      { $set: data },  
      { new: true }   
    );

    if (!updatedInvestor) {
      throw new NotFoundError();
    }

  
  } catch (error) {
    throw error;
  }
};


export const addInvestorBookmark = async (userId, startupUserId) => {
  try {
    const updatedInvestor = await InvestorDetails.findOneAndUpdate(
      { userId: userId}, 
      { $addToSet: { bookmarks: startupUserId } }, 
      { new: true } 
    );

    if (!updatedInvestor) {
      throw new Error("Investor not found");
    }

 
    return updatedInvestor; 
  } catch (error) {

  }}

  export const removeInvestorBookmark = async (userId, startupUserId) => {
    try {
      const updatedInvestor = await InvestorDetails.findOneAndUpdate(
        { userId: userId}, 
        { $pull: { bookmarks: startupUserId } }, 
        { new: true } 
      );
  
      if (!updatedInvestor) {
        throw new Error("Investor not found");
      }
  
   
      return updatedInvestor; 
    } catch (error) {
  
    }}


  export const FetchInvestorBookmark = async (userId) => {
    try {
      const investorBookmarks = await InvestorDetails.findOne({ userId })
        .select("bookmarks") 
      if (!investorBookmarks) {
        throw new Error("Investor not found");
      }
      return investorBookmarks.bookmarks;
    } catch (error) {
      throw new Error("Failed to fetch bookmarks");
    }
  };
  

  

  export const FetchInvestorDetails = async (userId) => {
    try {
      
      const investor = await InvestorDetails.findOne({ userId }).select("-number").select("-linkedinURL")
        
  
 
      if (!investor) {
        throw new Error("Investor not found");
      }
  
      return investor;
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
      throw new Error("Failed to fetch bookmarks");
    }
  };

  
  

  export const FetchInvestorCompleteDetails = async (userId) => {
    try {
      
      const investor = await InvestorDetails.findOne({ userId }).populate("offers").populate("bookmarks").populate("offers")
        
      if (!investor) {
        throw new Error("Investor not found");
      }
  
      return investor;
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
      throw new Error("Failed to fetch bookmarks");
    }
  };