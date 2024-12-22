import { fetchStartupCredentialsId } from "../services/s-authServices.js";
import { decryptToken } from "../services/s-authServices.js";


export const checkStartupLoginStatus = async (req, res, next) => {
  try {
   
    let { token } = req.cookies;
    if (!token) {
      return next();  
    }

    const decoded = decryptToken(token);
    const _id = decoded.id;  

    const result = await fetchStartupCredentialsId({ _id });
    if (result) {
      return res.status(409).json({ msg: "Already logged in" });
    }

    next();

  } catch (e) {

    console.error("Error checking login status:", e.message);
    next()
  }
};
