import { DatabaseError } from "../utils/errors.js";
import { fetchStartupsPagination } from "../services/s-informationServices.js";

export const MultipleStartupFetchController = async (req, res, next) => {
  try {
    const { type } = req.query;  
    const page = parseInt(req.query.page) || 1;  
    const limit = parseInt(req.query.limit) || 10; 
    const skip = (page - 1) * limit;            

    let query = {};
     //yet to be decided
    const startups = await fetchStartupsPagination(type, limit, skip);
    res.status(200).json(startups);
  } catch (error) {
    next(new DatabaseError("Error fetching startups"));
  }
};
