const mongoose = require("mongoose");
const enrolledCourseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    courseId: {
      type: mongoose.Types.ObjectId,
      required: true,
    }
  },
  { timestamps: true }
);
const enrolledCourseModel = mongoose.model(
  "enrolledCourses",
  enrolledCourseSchema
);
module.exports = enrolledCourseModel;
