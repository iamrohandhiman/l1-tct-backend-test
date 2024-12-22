import mongoose from "mongoose";
import dotenv from "dotenv";
import { Logger } from "winston";
import { logger } from "./logger.js";
dotenv.config();

export async function connectDatabase() {
  mongoose
    .connect(process.env.MONGO_DB_URI, { dbName: process.env.DB_NAME })
    .then(() => {
      logger.info({message:`Db connected`})
    })
    .catch((e) => {
      console.log(e);
    });
}
