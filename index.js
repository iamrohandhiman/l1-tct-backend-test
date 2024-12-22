import express from "express";
import dotenv from "dotenv";
import { connectDatabase } from "./config/database.js";
import { logger } from "./config/logger.js";
import cors from "cors"



// connect database
connectDatabase();

//import Middlewares
import entryErrorHandlerMiddleware from "./middlewares/errorMiddleware.js";
import cookieParser from "cookie-parser";
import { StartupAuthentication } from "./middlewares/s-authentication.js";
import { RequestLogger } from "./middlewares/requestLoggerMiddleware.js";


//import routes
import startupAuthRouter from "./routes/startupAuthRoutes.js";
import startupDetailsRouter from "./routes/startupDetailsRoutes.js"
import startupFinanceRouter from "./routes/startupFinanceRoutes.js"
import investorAuthRoutes from "./routes/investorAuthRoutes.js"
import investorDetailsRouter from "./routes/investorDetailsRoutes.js"
import paymentRouter from "./routes/paymentRoutes.js"
import offersRouter from "./routes/offerRoutes.js"
const app = express();


//setup
dotenv.config();
app.use(express.json());
app.use(cors())

//enviornment variables
const PORT = process.env.PORT || 3000;


//middleware
app.use(cookieParser())


//middleware routes
app.use(RequestLogger)
app.use(startupAuthRouter);
app.use(investorAuthRoutes)



//protected routes
// app.use(StartupAuthentication)
app.use(startupDetailsRouter)
app.use(startupFinanceRouter)
app.use(investorDetailsRouter)
app.use(paymentRouter)
app.use(offersRouter)


//error middlewares in-usage
app.use(entryErrorHandlerMiddleware);

//listener
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
