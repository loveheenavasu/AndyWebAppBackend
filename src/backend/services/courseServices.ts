import { FilterQuery, UpdateQuery } from "mongoose";
import { courseModel, courseDocument , moduleModel, contentModel, questionModel} from "../models/courseModel";

interface course {
  createCourse: (course: courseDocument) => Promise<courseDocument>;
  
  findCourse: (
    searchQuery: FilterQuery<courseDocument>,
    projectionQuery : any
  ) => Promise<courseDocument|any>;
  
  findOneCourse: (
    searchQuery: FilterQuery<courseDocument>,
    projectionQuery: any
  ) => Promise<courseDocument | null>;
  
  findOneAndUpdateCourse: (
    searchQuery: FilterQuery<courseDocument>,
    updateQuery: UpdateQuery<courseDocument>
  ) => Promise<courseDocument | null>;
  
  findOneAndDeleteCourse: (
    searchQuery: FilterQuery<courseDocument>
  ) => Promise<courseDocument | null>;
};

const courseServices : course = {

  /**
   * service to create the course
   * @param course 
   * @returns 
   */
  createCourse : async (course) => {
    return await courseModel.create(course);
  },

  /**
   * service to find the course
   * @param searchQuery 
   * @param projectionQuery 
   * @returns 
   */
  findCourse : async(searchQuery,projectionQuery) => {
    return await courseModel.find(searchQuery, projectionQuery);
  },

  /**
   * service ot find the single course
   * @param searchQuery 
   * @param projectionQuery 
   * @returns 
   */
  findOneCourse : async(searchQuery,projectionQuery) => {
    return await courseModel.findOne(searchQuery,projectionQuery);
  },

  /**
   * service to update the course
   * @param searchQuery 
   * @param updateQuery 
   * @returns 
   */
  findOneAndUpdateCourse : async(searchQuery,updateQuery) => {
    return await courseModel.findOneAndUpdate(searchQuery,updateQuery);
  },

  /**
   * service to delete a course
   * @param searchQuery 
   * @returns 
   */
  findOneAndDeleteCourse : async (searchQuery) => {
    return await courseModel.findOneAndDelete(searchQuery);
  }
};

export default courseServices;
