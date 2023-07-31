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
  /**
   * service to create the question
   * @param question 
   * @returns 
   */
    createQuestion : async (question) => {
        return await questionModel.create(question);
    },
  
    /**
     * service to find the question
     * @param searchQuery 
     * @param projectionQuery 
     * @returns 
     */
    findOneQuestion :async (searchQuery,projectionQuery) => {
        return await questionModel.findOne(searchQuery,projectionQuery);
    },
  
    /**
     * service to find and delete the question
     * @param searchQuery 
     * @returns 
     */
    findOneAndDeleteQuestion :async (searchQuery) => {
        return await questionModel.findOneAndDelete(searchQuery);
    }
}

export default questionServices;