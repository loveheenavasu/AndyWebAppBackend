import onBoardingController from "@/backend/controller/onBoardingControllert";
import helperFunction from "@/backend/helper/commonfunction";
import MESSAGES from "@/backend/utils/messages";
import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../../connectDb";
import onBoardingDataValidation from "@/backend/middleware/onBoardingDataValidation";

export default async function module(req:NextApiRequest,res:NextApiResponse) {
    await dbConnect();
    if(req.method!=='GET'){
        return res.status(405).json({message: MESSAGES.METHOD_NOT_ALLOWED});
    }
    const token = onBoardingDataValidation.checkToken(req);
    if(!token){
        return res.status(400).json({message : 'token not found'});
    }
    const session = await helperFunction.verifyUser(req,res);
    if(!session){
        return res.status(404).json({message:MESSAGES.UNAUTHORIZED_USER});
    }
    const courseId = onBoardingDataValidation.validateCourseId(req);
    if(!courseId){
        return res.status(400).json({message: MESSAGES.INVALID_COURSE_ID});
    }
    await onBoardingController.module(req,res);
};