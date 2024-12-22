import mongoose from "mongoose";

const StartupCredentialsSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
    unique: true, 
    trim: true, 
  },
  email: {
    type: String,
    required: true, 
    unique: true, 
    trim: true,
    lowercase: true, 
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
  },
  password: {
    type: String,
    required: true, 
    minlength: 8,
  },
  type: {
    type: String,
    enum: ['startup'], 
    required: true,
    default: 'startup', 
  },
}, {
  timestamps: true,
});

export const StartupCredentials = new mongoose.model(
  "StartupCredentials",
  StartupCredentialsSchema
);
