import mongoose, { Document, Schema } from "mongoose";

export interface enrollCourseDocument extends Document{
    userId : Schema.Types.ObjectId,
    courseId: Schema.Types.ObjectId,
    content : []
};

const enrolledCourseSchema = new mongoose.Schema<enrollCourseDocument>(
  {
    userId : {
      type : mongoose.Types.ObjectId,
      required : true,
    },
    courseId : {
      type : mongoose.Types.ObjectId,
      required : true,
    },
    content : [
      {
        _id : {
          type : mongoose.Types.ObjectId,
          index : true,
          unique : true,
        },
        duration : {
          total : Number,
          consumed : Number,
        },
        answer : [ Number ],
      },
    ],
  },
  { timestamps : true },
);
const enrolledCourseModel = mongoose.model<enrollCourseDocument>(
  'EnrolledCourse',
  enrolledCourseSchema,
);
export default enrolledCourseModel;