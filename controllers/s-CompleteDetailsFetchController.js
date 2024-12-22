
import { DatabaseError } from "../utils/errors.js";
import { fetchCompleteStartupById, fetchStartupDetails } from "../services/s-informationServices.js";
export const startupCompleteDetailsFetchController=async(req,res,next)=>{

    const id = req._id
    try {
      const startup = await fetchStartupDetails(id);
      if (!startup) {
        next(new DatabaseError("Startup not found"));
      }
      res.status(200).send(startup);
    } catch (e) {
      console.log(e)
      next(new DatabaseError("Internal Server Error"));
    }

}