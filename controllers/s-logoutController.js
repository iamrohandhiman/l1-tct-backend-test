import jwt from "jsonwebtoken";
import { logger } from "../config/logger.js";
import { ServiceUnavailableError } from "../utils/errors.js";

export const startupLogoutController = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()), 
      httpOnly: true,                
      secure: process.env.NODE_ENV === "production", 
    });
    res.status(200).send({ msg: "Logout Successful" });
  } catch (e) {
    logger.error("Error during logout", e);
    next(new ServiceUnavailableError("Error during logout, please try again later."));
  }
};
