import { StartupDetails } from "../model/StartupDetails.js";
import mongoose from "mongoose";
import { ValidationError,AuthenticationError,AuthorizationError ,NotFoundError,ConflictError,DatabaseError} from "../utils/errors.js";
import { logger } from "../config/logger.js";

export const uploadStartupDetails = async(data) => {
  try {
    await StartupDetails.create(data);
  } catch (e) {
    logger.error(e);
    throw e;
  }
};

export const fetchStartupDetails = async(userId) => {
  try {
    const fetchedData = await StartupDetails.findOne({ userId: userId });
    return fetchedData;
  } catch (e) {
    logger.error(e);
    throw new DatabaseError("Error fetching startup details.");
  }
};

export const updateStartupDetails = async (userId, data) => {
  try {
    const fetch = await fetchStartupDetails(userId);
    Object.assign(fetch, data);
    await fetch.save();
    return fetch;
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export const fetchFullStartupById = async (id) => {
  try {
    const fetchedData = await StartupDetails.findById(id)
      .select('-cofounders.contactDetails')
      .select('-founder.contactDetails')
      .populate("financialDetails")
      .populate("InvestorOffers");
    return fetchedData;
  } catch (e) {
    logger.error(e);
    throw new NotFoundError("Error fetching full startup details.");
  }
};

export const fetchStartupsPagination = async (query, limit, skip) => {
  try {
    const startups = await StartupDetails.find({hasfilledFundingRequest:true})
      .select('-cofounder.contactDetails')
      .select('-founder.contactDetails')
      .limit(limit)
      .skip(skip);
    return startups;
  } catch (e) {
    logger.error(e);
    throw new DatabaseError("Error fetching startups.");
  }
};

export const updateFileKey = async (userId, fileName, key, type) => {
  try {
    if (type === "fundingDocument") {
      const fetched = await StartupDetails.findOne({ userId: userId });
      fetched.fundingDocuments[fileName].key = key;
      await fetched.save();
    } else {
      const fetched = await StartupDetails.findOne({ userId: userId });
      fetched.documents[fileName].key = key;
      await fetched.save();
    }
  } catch (e) {
    logger.error(e);
    throw new DatabaseError("Error updating file key.");
  }
};

export const UpdateFileStatus = async (userId, fileName, type) => {
  try {
    if (type === "fundingDocument") {
      const updateResult = await StartupDetails.updateOne(
        { userId: userId },
        { $set: { [`fundingDocuments.${fileName}.uploaded`]: true } }
      );
      return updateResult;
    } else {
      const updateResult = await StartupDetails.updateOne(
        { userId: userId },
        { $set: { [`documents.${fileName}.uploaded`]: true } }
      );
      return updateResult;
    }
  } catch (error) {
    logger.error(error);
    throw new DatabaseError("Error updating file status.");
  }
};

export const UpdateStartupFundingRequest = async (userId, data) => {
  try {
    const updatedResult = await StartupDetails.updateOne(
      { userId: userId },
      { $set: { fundingRequest: data.fundingRequest, hasfilledFundingRequest: true } }
    );
    return updatedResult;
  } catch (e) {
    logger.error(e);
    throw new DatabaseError("Error updating funding request.");
  }
};

export const fetchCompleteStartupById = async(userId) => {
  try {
    
    const startup = await StartupDetails.findById(userId )

    if (!startup) {
      throw new Error("startup not found");
    }

    return startup
  } catch (error) {
    
    throw error
  }
};



export const SearchStartupService = async (name) => {
  try {
    const users = await StartupDetails.find({
      "startupDetails.businessName": { $regex: name, $options: 'i' },
    })
      .select("-cofounders.contactDetails") 
      .select("-founder.contactDetails") 
      .populate("financialDetails") 
      .populate("InvestorOffers"); 

    if (!users.length) {
      return []; 
    }

    return users; 
  } catch (error) {
    throw error; 
  }
};
