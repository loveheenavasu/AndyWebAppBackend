import { NextApiRequest, NextApiResponse } from "next";
import helperFunction from "../helper/commonfunction";
import MESSAGES from "../utils/messages";
import questionServices from "../services/questionServices";
import enrollCourseServices from "../services/enrolledCourseServices";
import contentServices from "../services/contentServices";
import courseServices from "../services/courseServices";
import moduleServices from "../services/moduleServices";

interface onBoardingControllerInterface {
  verifyOnBoarding: (
    req: NextApiRequest,
    res: NextApiResponse
  ) => Promise<void>;
  test: (req: NextApiRequest, res: NextApiResponse) => Promise<void>;
  question : (req : NextApiRequest,res : NextApiResponse) => Promise<void>;
  module : (req : NextApiRequest,res:NextApiResponse) => Promise<void>;
  content : (req:NextApiRequest,res:NextApiResponse) => Promise<void>;
}

const onBoardingController: onBoardingControllerInterface = {
  verifyOnBoarding: async (req, res) => {
    const userId = await helperFunction.verifyUser(req, res);
    if (!userId) {
      return res.status(404).json({ message: MESSAGES.USER_NOT_FOUND });
    }
    const user = await helperFunction.getUser(userId);
    if (!user) {
      return res.status(404).json({ message: MESSAGES.USER_NOT_FOUND });
    }
    res.status(200).json(user);
  },

  test: async (req, res) => {
    const { questionId, value } = req.query;
    const answer = await questionServices.findOneQuestion({ _id: questionId, answer: value },{});
    const enroll = await enrollCourseServices.findOneAndUpdateEnrollCourse({
        userId: req.query.userId,
        courseId: req.query.courseId,
        "content._id":req.query.contentId
    },{$push: { "content.$.answer": req.query.value }});
    if(answer){
        return res.status(200).json({message : MESSAGES.CORRECT_ANSWER});
    }
    else {
        return res.status(404).json({message : MESSAGES.INCORRECT_ANSWER});
    }
  },

  question: async (req, res) => {
    const content = await contentServices.findOneContent({ _id: req.query.contentId });
    if (!content || content?.questions?.length === 0) {
      return res.status(404).json({message: MESSAGES.CONTENT_NOT_FOUND});
    }
    const questionList:any = []; 
    for (let i = 0; i < (content?.questions?.length ?? 0); i++) {
      questionList.push(await questionServices.findOneQuestion({ _id: content.questions[i] }, {}));
    }
    res.status(200).json(questionList); 
  }
  ,
  module : async (req,res) => {
    const course = await courseServices.findOneCourse({_id:req.query.courseId},{});
    const module = [];
    for(let i = 0;i < (course?.modules.length??0); i++) {
        module.push(await moduleServices.findOneModule({ _id : course?.modules[i] } ));
    }
    return res.status(200).json(module.flat());
  },
  content : async(req,res)=>{
    const module = await moduleServices.findOneModule({_id:req.query.moduleId});
    const contents =[];
    for(let i = 0;i < (module?.content.length??0); i++) {
        contents.push(await contentServices.findOneContent({ _id : module?.content[i] } ));
    }
    res.status(200).json(contents);
  }
};

export default onBoardingController;
