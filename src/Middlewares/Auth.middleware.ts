import { Request, Response, NextFunction } from "express";
import logger from "../Config/logger";
import { RequireAuthProp } from "@clerk/clerk-sdk-node";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
export async function AuthMiddleware(
  req: RequireAuthProp<Request>,
  res: Response,
  next: NextFunction
) {
  try {
    const middleware = ClerkExpressRequireAuth();
    middleware(req, res, (err) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Unauthorized Access! Please Login First." });
      } else {
        next();
      }
    });
  } catch (error) {
    logger.error(`issue occured in auth middleware and error is:\n ${error}`);
  }
}
