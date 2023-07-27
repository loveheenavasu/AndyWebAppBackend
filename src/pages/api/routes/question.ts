import helperFunction from "@/backend/helper/commonfunction";
import onBoardingDataValidation from "@/backend/middleware/onBoardingDataValidation";
import MESSAGES from "@/backend/utils/messages";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../connectDb";
import onBoardingController from "@/backend/controller/onBoardingControllert";

export default async function question (req :NextApiRequest,res:NextApiResponse) {
    await dbConnect();
    if(req.method!=='GET'){
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
    await onBoardingController.question(req,res);
};