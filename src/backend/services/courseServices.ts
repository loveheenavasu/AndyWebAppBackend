import { FilterQuery, UpdateQuery } from "mongoose";
import { courseModel, courseDocument } from "../models/courseModel";

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
  ) => Promise<courseDocument|null>;
};

const courseServices : course = {
  createCourse : async(course)=>{
    return await courseModel.create(course);
  },

  findCourse : async(searchQuery,projectionQuery) => {
    return await courseModel.find(searchQuery,projectionQuery);
  },

  findOneCourse : async(searchQuery,projectionQuery) => {
    return await courseModel.findOne(searchQuery,projectionQuery);
  },

  findOneAndUpdateCourse : async(searchQuery,updateQuery) => {
    return await courseModel.findOneAndUpdate(searchQuery,updateQuery);
  },

  findOneAndDeleteCourse : async (searchQuery) => {
    return await courseModel.findOneAndDelete(searchQuery);
  }
};

export default courseServices;
