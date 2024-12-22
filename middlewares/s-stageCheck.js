import { StartupDetails } from "../model/StartupDetails.js";

// Middleware to check if Startup Details are filled
export const hasfilledStartupDetails = async (req, res, next) => {
  try {
    const userId = req._id;

    // Fetch only the `hasfilledStartupDetails` field
    const result = await StartupDetails.findOne({ userId }).select("hasfilledStartupDetails");

    if (!result) {
      return res.status(404).send({ msg: "Startup details not found for this user" });
    }

    if (result.hasfilledStartupDetails) {
      next();
    } else {
      res.status(400).send({ msg: "Please fill the Startup Details First" });
    }
  } catch (e) {
    next(e); // Pass the error to the global error handler
  }
};


export const hasfilledDocuments = async (req, res, next) => {
  try {
    const userId = req._id;
    const user = await StartupDetails.findOne({ userId });
    if (!user) {
      return res.status(404).send({ msg: "Startup details not found for this user" });
    }
    if (user.hasfilledDocuments) {
      return next();
    }
    const requiredDocs = [
      user.documents?.companyPan?.uploaded,
      user.documents?.certificateOfIncorporation?.uploaded,
      user.documents?.auditedFinancials?.uploaded,
      user.documents?.businessProjections?.uploaded,
    ];

    if (requiredDocs.every((doc) => doc === true)) {
      user.hasfilledDocuments = true;
      await user.save(); 
      return next();
    }

    res.status(400).send({ msg: "Please upload the Startup Documents First" });
  } catch (e) {
    next(e); 
  }
};

export const hasfilledFinancialDetails = async (req, res, next) => {
  try {
    const userId = req._id;

    const result = await StartupDetails.findOne({ userId }).select("hasfilledFinancialDetails");

    if (!result) {
      return res.status(404).send({ msg: "Financial details not found for this user" });
    }

    if (result.hasfilledFinancialDetails) {
      next();
    } else {
      res.status(400).send({ msg: "Please fill the Financial Details First" });
    }
  } catch (e) {
    next(e); 
  }
};
