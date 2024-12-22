
import { InvestorCredentials } from "../model/InvestorCredentials.js";
import { ValidationError } from "../utils/errors.js";
import { AuthenticationError } from "../utils/errors.js";
import { NotFoundError } from "../utils/errors.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export const saveInvestorCredentials = async (data) => {
  try {
    const newInvestor = await InvestorCredentials.create(data);
    return newInvestor;
  } catch (error) {
    throw error;
  }
};


export const fetchInvestorCredentialsId = async (data) => {
  try {
    const investor = await InvestorCredentials.findOne({ _id: data._id });

    if (!investor) {
      throw new AuthenticationError("Investor not found");
    }

    return investor;
  } catch (error) {
    console.error("Error fetching investor credentials:", error.message);
    throw new AuthenticationError("Error fetching investor credentials");
  }
};

export const fetchInvestorCredentialsEmail = async (data) => {
  try {
    const investor = await InvestorCredentials.findOne({ email: data.email });
   
    if (!investor) {
      throw new NotFoundError("investor not found");
    }

    return investor;
  } catch (error) {
    console.error("Error fetching investor credentials:", error.message);
    throw new AuthenticationError("Error fetching investor credentials");
  }
};
