//imports
import express from "express";
import dotenv from "dotenv";
import { Request, Response } from "express";
import logger from "./Config/logger";
import cors from "cors";
import { Clerk } from "@clerk/clerk-sdk-node";

const clerkClient = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

export { clerkClient };
//environment variables configuration
dotenv.config();
// express app instance
const app = express();
// cors configuration
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// important middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Database Connection
import dbConnection from "./Database/DB";
dbConnection.ConnectDB();

//health route
app.get("/health", (req: Request, res: Response) => {
  let health = dbConnection.getConnectionStatus();
  res.status(200).json({ DB_Health: health, server_status: "Server is up!" });
});

//routes importing
import Dashboard from "./Modules/Dashboard/routes";

//routes registration
app.use("/dashboard", Dashboard);

// PORT LISTENING
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  logger.info(`Backend server is running on port ${PORT}`);
});
