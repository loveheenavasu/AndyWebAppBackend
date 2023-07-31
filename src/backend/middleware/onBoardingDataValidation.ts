import { NextApiRequest, NextApiResponse } from "next";
import MESSAGES from "../utils/messages";
import mongoose, { Types } from "mongoose";

interface onBoarding {
    verifyOnboading : (req:NextApiRequest,res:NextApiResponse) => boolean;
    validateQuestionId : (req:NextApiRequest) => boolean;
    validateCourseId : (req:NextApiRequest) =>boolean;
    validateContentId : (req:NextApiRequest) =>boolean;
    validateModuleId : (req:NextApiRequest) =>boolean;
    testData : (req: NextApiRequest)=>boolean;
    checkToken : (req : NextApiRequest)=>boolean;
};
const onBoardingDataValidation : onBoarding = {
    checkToken : (req)=>{
        if(!req.headers.authorization){
            return false;
        }
        return true;
    },
    verifyOnboading : (req,res) => {
        if(!req.headers.authorization){
            return false;
        }
        return true;
    },
    validateQuestionId : (req) => {
        const questionId = req.query.questionId as string;
        if (!mongoose.Types.ObjectId.isValid(questionId)) {
          return false;
        }
        return true;
    },
    validateCourseId : (req) => {
        const courseId = req.query.courseId as string;
        if (!mongoose.Types.ObjectId.isValid(courseId)) {
          return false;
        }
        return true;
    },
    validateContentId : (req) => {
        const contentId = req.query.contentId as string;
        if(!mongoose.Types.ObjectId.isValid(contentId)) {
            return false;
        }
        return true;
    },
    validateModuleId : (req) =>{
        const moduleId = req.query.moduleId as string;
        if(!mongoose.Types.ObjectId.isValid(moduleId)) {
            return false;
        }
        return true;
    },
    testData : (req) => {
        if(!req.query.value){
            return false;
        }
        return true;
    }
}

export default onBoardingDataValidation;