import { fetchStartupCredentialsId } from "../services/s-authServices.js";
import { decryptToken } from "../services/s-authServices.js";

export const StartupAuthentication = async (req, res, next) => {
  try {
    let { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ msg: "Authentication token is missing" });
    }

    const decoded = decryptToken(token);
    if(decoded.type!="startup"){
      return res.status(401).json({ msg: "You must be signed in as a Startup to access this" })
    }
    const _id = decoded.id;
    req._id = _id;
    const result = await fetchStartupCredentialsId({ _id });
    if (!result) {
      return res.status(401).json({ msg: "Invalid token or startup not found" });
    }
    
    next();

  } catch (e) {
    
    console.error("Error during authentication:", e.message);

    if (e.message.includes("JWT")) {
     
      return res.status(401).json({ msg: "Invalid or expired token" });
    } else {
      
      return res.status(500).json({ msg: "Internal server error" });
    }
  }
};
