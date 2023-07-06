const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema(
  {
    course: {
      courseName: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      courseLesson: [
        {
          lesson: {
            lessonName:{type:String,required:true},
            description: { type: String, required: true },
            lessonId: {
              type: mongoose.Types.ObjectId,
              default: new mongoose.Types.ObjectId(),
            },
            questionAnswer: [
              {
                question: { type: String, required: true },
                options: [{ type: String, required: true }],
                correctAnswer: { type: String, required: true },
              },
            ],
          },
        },
      ],
    },
  },
  { timestamps: true }
);
const courseModel = mongoose.model("courses", courseSchema);
module.exports = courseModel;
