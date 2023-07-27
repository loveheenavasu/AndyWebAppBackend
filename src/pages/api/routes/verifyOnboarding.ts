import { NextApiRequest, NextApiResponse } from "next";
import onBoardingController from "@/backend/controller/onBoardingControllert";
import MESSAGES from "@/backend/utils/messages";
import onBoardingDataValidation from "@/backend/middleware/onBoardingDataValidation";
import dbConnect from "../../../../connectDb";

export default async function verifyOnBoarding(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    await dbConnect();
    if (req.method !== "GET") {
      return res.status(405).json({ message: MESSAGES.METHOD_NOT_ALLOWED });
    }
    try {
      const validationResponse : any = onBoardingDataValidation.verifyOnboading(req,res);
      if(!validationResponse){
        return res.status(400).json({message : MESSAGES.UNAUTHORIZED_USER});
      }
      await onBoardingController.verifyOnBoarding(req, res);
    } catch (error) {
      console.error("Error while verifying onboarding:", error);
      return res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
    }
  }