
import jwt from 'jsonwebtoken'
import { decryptToken } from '../services/s-authServices.js';
import { fetchStartupCredentialsId } from '../services/s-authServices.js';
import { fetchInvestorCredentialsId } from '../services/i-authServices.js';
export const mixAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ msg: "Authentication token is missing" });
    }

    const decoded = decryptToken(token);
  

    if (!decoded || !decoded.id || !decoded.type) {
      return res.status(401).json({ msg: "Invalid or malformed token" });
    }

    const _id = decoded.id;
    req._id = _id;
    req.type = decoded.type
    let result;

    if (decoded.type === "startup") {
      result = await fetchStartupCredentialsId({ _id });
      if (!result) {
        return res.status(401).json({ msg: "Invalid token or startup not found" });
      }
    } else if (decoded.type === "investor") {
      result = await fetchInvestorCredentialsId({ _id });
      if (!result) {
        return res.status(401).json({ msg: "Invalid token or investor not found" });
      }
    } else {
      return res.status(403).json({ msg: "Unsupported user type" });
    }

    next();
  } catch (e) {
    console.error("Error during authentication:", e);

    if (e.name === "JsonWebTokenError" || e.name === "TokenExpiredError") {
      return res.status(401).json({ msg: "Invalid or expired token" });
    }

    next(e) 
  }
};
