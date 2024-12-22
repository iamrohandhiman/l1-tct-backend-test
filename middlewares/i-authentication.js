import { fetchInvestorCredentialsId } from "../services/i-authServices.js";
import { decryptToken } from "../services/s-authServices.js";

export const InvestorAuthentication = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ msg: "Authentication token is missing" });
    }

    const decoded = decryptToken(token);

    if (!decoded || !decoded.type || !decoded.id) {
      return res.status(401).json({ msg: "Invalid or malformed token" });
    }

    if (decoded.type.toLowerCase() !== "investor") {
      return res.status(401).json({ msg: "You must be signed in as an investor to access this" });
    }

    const _id = decoded.id;
    req._id = _id;

    console.log("Decoded token:", decoded);

    const result = await fetchInvestorCredentialsId({ _id });

    if (!result) {
      return res.status(401).json({ msg: "Invalid token or investor not found" });
    }

    next();
  } catch (e) {
    console.error("Error during authentication:", e.message);

    if (e.name === "JsonWebTokenError" || e.name === "TokenExpiredError") {
      return res.status(401).json({ msg: "Invalid or expired token" });
    }

    next(e); 
  }
};
