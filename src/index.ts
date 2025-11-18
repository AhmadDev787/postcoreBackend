//imports
import express from "express";
import dotenv from "dotenv";
import { Request, Response } from "express";

//configuration
dotenv.config();
const app = express();

//Database Connection
import dbConnection from "./Database/DB";
dbConnection.ConnectDB();

//health route
app.get("/health", (req: Request, res: Response) => {
  let health = dbConnection.getConnectionStatus();
  res.status(200).json({ DB_Health: health, server_status: "Server is up!" });
});
// PORT LISTENING
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});
