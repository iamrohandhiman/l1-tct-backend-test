import { StartupCredentials } from "../model/StartupCredentials.js";
import { ValidationError } from "../utils/errors.js";
import { AuthenticationError } from "../utils/errors.js";
import { NotFoundError } from "../utils/errors.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export const saveStartupCredentials = async (data) => {
  try {
    const newStartup = await StartupCredentials.create(data);
    return newStartup;
  } catch (error) {
    throw error;
  }
};

export const fetchStartupCredentialsEmail = async (data) => {
  try {
    const startup = await StartupCredentials.findOne({ email: data.email });

    if (!startup) {
      throw new NotFoundError("Startup not found");
    }

    return startup;
  } catch (error) {
    console.error("Error fetching startup credentials:", error.message);
    throw new AuthenticationError("Error fetching startup credentials");
  }
};

export const fetchStartupCredentialsId = async (data) => {
  try {
    const startup = await StartupCredentials.findOne({ _id: data._id });

    if (!startup) {
      throw new AuthenticationError("Startup not found");
    }

    return startup;
  } catch (error) {
    console.error("Error fetching startup credentials:", error.message);
    throw new AuthenticationError("Error fetching startup credentials");
  }
};

export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log("Error hashing password");
    throw new ValidationError("Error hashing password", 500);
  }
};

export const generateToken = (userId, type) => {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.log("JWT Secret is undefined in environment variables");
      throw new ValidationError("JWT Secret not defined", 500);
    }
    return jwt.sign({ id: userId, type: type }, secret, { expiresIn: "30d" });
  } catch (error) {
    throw new ValidationError("Error generating token", 500);
  }
};

export const decryptToken = (token) => {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.log("JWT Secret is undefined in environment variables");
      throw new ValidationError("JWT Secret not defined", 500);
    }
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      throw new ValidationError("Invalid token", 401);
    }
    if (error.name === 'TokenExpiredError') {
      throw new ValidationError("Token has expired", 401);
    }
    throw new ValidationError("Error verifying token", 500);
  }
};
