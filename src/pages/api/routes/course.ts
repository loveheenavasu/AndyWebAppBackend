import MESSAGES from "@/backend/utils/messages";
import { NextApiRequest, NextApiResponse } from "next";
import onBoardingDataValidation from "@/backend/middleware/onBoardingDataValidation";
import helperFunction from "@/backend/helper/commonfunction";
import onBoardingController from "@/backend/controller/onBoardingControllert";
import dbConnect from "../../../../connectDb";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  if (req.method !== "GET") {
    return res.status(405).json({ message: MESSAGES.METHOD_NOT_ALLOWED });
  }
  onBoardingDataValidation.checkToken(req);
  const token = onBoardingDataValidation.checkToken(req);
  if (!token) {
    return res.status(400).json({ message: MESSAGES.TOKEN_NOT_FOUND });
  }
  const session = await helperFunction.verifyUser(req, res);
  if (!session) {
    return res.status(404).json({ message: MESSAGES.UNAUTHORIZED_USER });
  }
  await onBoardingController.course(req, res);
}
