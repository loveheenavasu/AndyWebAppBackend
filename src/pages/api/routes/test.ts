import onBoardingController from "@/backend/controller/onBoardingControllert";
import onBoardingDataValidation from "@/backend/middleware/onBoardingDataValidation";
import MESSAGES from "@/backend/utils/messages";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../connectDb";
import helperFunction from "@/backend/helper/commonfunction";

export default async function test (req : NextApiRequest,res : NextApiResponse) {
    await dbConnect();
    if(req.method!=='GET') {
        return res.status(405).json({message : MESSAGES.METHOD_NOT_ALLOWED});
    }
    const token = onBoardingDataValidation.checkToken(req);
    if(!token){
        return res.status(400).json({message : 'token not found'});
    }
    const userId = await helperFunction.verifyUser(req,res);
    if (!userId) {
        return res.status(404).json({messages : MESSAGES.UNAUTHORIZED_USER});
    }
    const validation = onBoardingDataValidation.testData(req);
    if(!validation){
        return res.status(400).json({message:MESSAGES.INVALID_REQUEST});
    }
    onBoardingController.test(req,res);
}