import logger from "../../../Config/logger";
import { Request, Response } from "express";
import { RequireAuthProp } from "@clerk/clerk-sdk-node";
import User from "../../../Models/User.model";
import dotenv from "dotenv";
dotenv.config();

export async function addOnboardingData(
  req: RequireAuthProp<Request>,
  res: Response
) {
  try {
    let data = req.body.onboardingData;
    let s2 = JSON.parse(data.s2);
    let s3 = JSON.parse(data.s3);
    let s4 = JSON.parse(data.s4);
    let existingUser = await User.find({ clerkId: req.auth.userId });
    if (existingUser[0].onboardingCompleted == false) {
      existingUser[0].userProfile.persona = data.s1;
      existingUser[0].userProfile.businessInfo.businessName = s2.businessName;
      existingUser[0].userProfile.businessInfo.role = s2.role;
      existingUser[0].userProfile.businessInfo.size = s2.size;
      existingUser[0].userProfile.businessInfo.industry = s2.industry;
      existingUser[0].userProfile.brandVoice = s3.brandVoice;
      existingUser[0].userProfile.targetAudience = s3.audience;
      existingUser[0].userProfile.contentGoals = s3.goals;
      existingUser[0].userProfile.preferredFormats = s4.preferredFormats;
      existingUser[0].userProfile.offers = s4.offerings;
      existingUser[0].userProfile.uniqueValue = s4.uniqueValue;
      existingUser[0].onboardingCompleted = true;
      existingUser[0].save();
      return res
        .status(200)
        .json({ message: "Onboarding Form Submitted! Welcome To Postcore AI" });
    } else {
      return res
        .status(200)
        .json({ message: "Onboarding Form Data Already Added!" });
    }
  } catch (error) {
    logger.error("Error occured in adding onboarding data! \n", error);
  }
}
