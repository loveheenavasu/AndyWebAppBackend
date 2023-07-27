import mongoose, { Document } from "mongoose";

export interface admin extends Document {
  email : string,
  password : string,
  isAdmin : Boolean
}

const adminSchema = new mongoose.Schema<admin>( {
  email : {
    type : String,
    required : true,
  },
  password : {
    type : String,
    required : true,
  },
  isAdmin : {
    type : Boolean,
  },
} );

const adminModel = mongoose.model<admin>( 'Admin', adminSchema );

export default adminModel;