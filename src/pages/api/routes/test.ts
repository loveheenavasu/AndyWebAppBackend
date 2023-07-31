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
        return res.status(400).json({message : MESSAGES.TOKEN_NOT_FOUND});
    }
    const userId = await helperFunction.verifyUser(req,res);
    if (!userId) {
        return res.status(404).json({messages : MESSAGES.UNAUTHORIZED_USER});
    }
    const value = onBoardingDataValidation.testData(req);
    if(!value) {
        return res.status(400).json({message : MESSAGES.INCOMPLETE_DATA});
    }
    const questionId = await onBoardingDataValidation.validateQuestionId(req);
    if(!questionId){
        return res.status(400).json({message : MESSAGES.INVALID_QUESTION_ID});
    }
    const courseId = await onBoardingDataValidation.validateCourseId(req);
    if(!courseId){
        return res.status(400).json({message : MESSAGES.INVALID_COURSE_ID});
    }
    const contentId = await onBoardingDataValidation.validateContentId(req);
    if(!contentId){
        return res.status(400).json({message : MESSAGES.INVALID_CONTENT_ID});
    }

    await onBoardingController.test(req,res);
}