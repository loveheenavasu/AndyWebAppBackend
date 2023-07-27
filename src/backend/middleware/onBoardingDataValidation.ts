import { NextApiRequest, NextApiResponse } from "next";
import MESSAGES from "../utils/messages";
import mongoose, { Types } from "mongoose";

interface onBoarding {
    verifyOnboading : (req:NextApiRequest,res:NextApiResponse) => boolean;
    validateQuestionId : (req:NextApiRequest) => boolean;
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
    testData : (req) => {
        if(!req.query.value){
            return false;
        }
        return true;
    }
}

export default onBoardingDataValidation;