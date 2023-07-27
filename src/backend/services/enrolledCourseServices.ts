import { FilterQuery, UpdateQuery } from "mongoose";
import enrolledCourseModel, { enrollCourseDocument } from "../models/enrollCourseModel";

interface enrollCourse {
  createEnroll: (
    payload: enrollCourseDocument
  ) => Promise<enrollCourseDocument>;
  findOneEnrollCourse: (
    searchQuery: FilterQuery<enrollCourseDocument>,
    projectionQuery: any
  ) => Promise<enrollCourseDocument | null>;
  findOneAndDeleteEnrollCourse : (
    searchQuery : FilterQuery<enrollCourseDocument>
  ) => Promise<enrollCourseDocument|null>;
  findOneAndUpdateEnrollCourse : (
    searchQuery:FilterQuery<enrollCourseDocument>,
    updateQuery : UpdateQuery<enrollCourseDocument>
  )=>Promise<enrollCourseDocument|null>;
}

const enrollCourseServices : enrollCourse = {
  createEnroll : async (payload) =>{
    return await enrolledCourseModel.create(payload);
  },
  findOneEnrollCourse : async (searchQuery,projectionQuery) => {
    return await enrolledCourseModel.findOne(searchQuery,projectionQuery);
  },
  findOneAndDeleteEnrollCourse : async (searchQuery) => {
    return await enrolledCourseModel.findOneAndDelete(searchQuery);
  },
  findOneAndUpdateEnrollCourse : async (searchQuery,updateQuery)=>{
    return await enrolledCourseModel.findOneAndUpdate(searchQuery,updateQuery);
  }
};

export default enrollCourseServices;
