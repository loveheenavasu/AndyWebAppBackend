const mongoose = require( 'mongoose' );

const questionAnswerSchema = new mongoose.Schema( {
  _id : {
    type : mongoose.Types.ObjectId,
    auto : true,
    index : true,
  },
  question : {
    type : String,
    required : true,
  },
  options : [
    {
      type : String,
      required : true,
    },
  ],
  correctAnswer : {
    type : String,
    required : true,
  },
} );

const lessonSchema = new mongoose.Schema( {
  lessonName : {
    type : String,
    required : true,
  },
  description : {
    type : String,
    required : true,
  },
  questionAnswer : [ questionAnswerSchema ],
} );

const courseSchema = new mongoose.Schema(
  {
    courseName : {
      type : String,
      required : true,
    },
    description : {
      type : String,
      required : true,
    },
    courseLesson : [
      {
        lesson : {
          type : mongoose.Types.ObjectId,
          ref : 'lessons',
        },
      },
    ],
  },
  { timestamps : true },
);

const courseModel = mongoose.model( 'Course', courseSchema );
const lessonModel = mongoose.model( 'Lesson', lessonSchema );

module.exports = {
  courseModel,
  lessonModel,
};
