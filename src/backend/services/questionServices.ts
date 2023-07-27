import { FilterQuery } from "mongoose";
import { questionModel, questionDocument } from "../models/courseModel";

interface question {
  createQuestion: (question: questionDocument) => Promise<questionDocument>;
  
  findOneQuestion: (
    searchQuery: FilterQuery<questionDocument>,
    projectionQuery: any
  ) => Promise<questionDocument | null>;
  
  findOneAndDeleteQuestion: (
    searchQuery: FilterQuery<questionDocument>
  ) => Promise<questionDocument|null>;
}

const questionServices : question = {
    createQuestion : async (question) => {
        return await questionModel.create(question);
    },
  
    findOneQuestion :async (searchQuery,projectionQuery) => {
        return await questionModel.findOne(searchQuery,projectionQuery);
    },
  
    findOneAndDeleteQuestion :async (searchQuery) => {
        return await questionModel.findOneAndDelete(searchQuery);
    }
}

export default questionServices;