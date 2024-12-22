import { ValidationError, AuthenticationError, AuthorizationError, NotFoundError, ConflictError, DatabaseError, ServiceUnavailableError } from "../utils/errors.js";
import { s3Client } from "../config/aws/s3.js";
import { Bucket } from "../config/aws/s3.js";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { StartupDetails } from "../model/StartupDetails.js";

export async function getObjectURL(key) {
  try {
    const command = new GetObjectCommand({
      Bucket: Bucket,
      Key: key,
    });
    const signedURL = getSignedUrl(s3Client, command);
    if (!signedURL) {
      throw new ServiceUnavailableError("Request resource does not exist");
    }
    return signedURL;
  } catch (error) {
    throw new ServiceUnavailableError("Error getting information from the S3 bucket");
  }
}

export async function putObjectURL(filename, contentType, key) {
  try {
    const command = new PutObjectCommand({
      Bucket: Bucket,
      Key: key,
      ContentType: contentType,
    });

    const signedURL = await getSignedUrl(s3Client, command);

    if (!signedURL) {
      throw new ServiceUnavailableError("Failed to generate signed URL for upload.");
    }

    return signedURL;
  } catch (error) {
    throw new ServiceUnavailableError("Error creating upload URL for the S3 bucket.");
  }
}

export const getS3Key = async (userId, fileName, type) => {
  try {
    const fetched = await StartupDetails.findById(userId);
    const key = type === "fundingDocument"
      ? fetched.fundingDocuments[fileName].key
      : fetched.documents[fileName].key;
    
    if (!key) {
      throw new DatabaseError("Key does not exist");
    }
    return key;
  } catch (error) {
    throw new DatabaseError("Error finding key");
  }
};
