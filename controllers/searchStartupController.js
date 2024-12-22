import { SearchStartupService } from "../services/s-informationServices.js";

export const searchStartupController = async(req,res,next)=>{
    try {
      const { name } = req.query; 
      const users = await SearchStartupService(name)
      res.json(users);
    } catch (error) {
      next(error);
    }
}