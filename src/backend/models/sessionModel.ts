import mongoose, { Document, Schema } from "mongoose";

export interface sessionDocument extends Document {
  userId : Schema.Types.ObjectId;
  token : string;
  userType : string;
}

const sessionSchema = new Schema<sessionDocument>(
  {
    userId: { type : Schema.Types.ObjectId, required : true },
    token: { type : String, required : true },
    userType: { type : String, required : true },
  },
  { timestamps: true }
);

const sessionModel = mongoose.model<sessionDocument>("Session", sessionSchema);

export default sessionModel;


