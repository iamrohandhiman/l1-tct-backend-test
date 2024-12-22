import { DatabaseError } from "../utils/errors.js";
import { fetchFullStartupById } from "../services/s-informationServices.js";

export const startupDetailsFetchController = async (req, res, next) => {
  const { id } = req.params;
  try {
    const startup = await fetchFullStartupById(id);
    if (!startup) {
      next(new DatabaseError("Startup not found"));
    }
    res.status(200).send(startup);
  } catch (e) {
    next(new DatabaseError("Internal Server Error"));
  }
};
