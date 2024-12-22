import { validationResult, matchedData } from "express-validator";
import { fetchStartupCredentialsEmail, generateToken } from "../services/s-authServices.js";
import { AuthenticationError } from "../utils/errors.js";
import bcrypt from "bcrypt";
import { logger } from "../config/logger.js";
import { fetchInvestorCredentialsEmail } from "../services/i-authServices.js";

export const investorLoginController = async (req, res, next) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      logger.error("Validation errors", result.array());
      return next(new AuthenticationError());
    }

    const data = matchedData(req);
    const investorData = await fetchInvestorCredentialsEmail(data);

    if (!investorData) {
      return next(new AuthenticationError("Investor credentials not found"));
    }
   console.log(data.password,investorData)
    const isPasswordMatch = await bcrypt.compare(data.password, investorData.password);
    if (!isPasswordMatch) {
      return next(new AuthenticationError());
    }

    const token = generateToken(investorData._id, "investor");

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, 
    });

    return res.status(200).json({ msg: "Login Successful" });
  } catch (error) {
    logger.error("Error during login", error);
    next(error);
  }
};
