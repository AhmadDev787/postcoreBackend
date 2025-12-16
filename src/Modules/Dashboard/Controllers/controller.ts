import logger from "../../../Config/logger";
import { Request, Response } from "express";
import { RequireAuthProp } from "@clerk/clerk-sdk-node";
import User from "../../../Models/User.model";
import dotenv from "dotenv";
import { clerkClient } from "../../..";
dotenv.config();
export async function getUserDashboardData(
  req: RequireAuthProp<Request>,
  res: Response
) {
  try {
    let user = await clerkClient.users.getUser(req.auth.userId);

    let existingUser = await User.find({ clerkId: req.auth.userId });
    if (existingUser.length > 0) {
      // frontend should check that onboarding is completed or not
      if (existingUser[0].onboardingCompleted == false) {
        return res.status(200).json({
          message: "Please Complete The Onboarding Form First!",
          onboarding: false,
        });
      }
      // todo here we generate ideas and fetch other data
    } else {
      let newUser = new User({
        clerkId: req.auth.userId,
        name: user?.firstName,
        email: user?.emailAddresses[0].emailAddress,
        avatarUrl: user?.imageUrl,
      });
      newUser.save();
    }
  } catch (error) {
    logger.error(
      "Error occured in getting user's dashboard data and error is ",
      error
    );
    res.status(404).json({ message: "User's Dashboard Data Not Found!" });
  }
}
