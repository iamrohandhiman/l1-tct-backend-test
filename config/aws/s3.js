import dotenv from "dotenv"
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
dotenv.config()

export const s3Client = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId:process.env.S3_ACCESS_KEY_ID,
    secretAccessKey:process.env.S3_SECRET_ACCESS_KEY
  },
});

export const Bucket = process.env.S3_BUCKET
