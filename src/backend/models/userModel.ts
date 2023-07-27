import mongoose, { Document } from "mongoose";

export interface userDocument extends Document {
    email: string;
    first: string;
    last: string;
    mobile: string;
    type: string;
    status: string;
    reject: string | null;
    address: {
      suburb: string;
      state: string;
      postcode: number;
    };
    profile: {
      resume: string;
      experience: string;
      situation: string;
      license: string;
      school: string;
      referral: string;
      subjects: string[];
    };
    interview: {
      booking_link: string | null;
      date: Date | null;
      room: string | null;
      pre_answers: string | null;
      notes: string | null;
      outcome: string | null;
    };
    onboarding: {
      status: string | null;
      started: string | null;
      completed: string | null;
      percentage: string | null;
      current_module: string | null;
    };
    reminder: {
      enabled: boolean | null;
      level: number | null;
      last_sent: string | null;
    };
}

const userSchema = new mongoose.Schema<userDocument>(
  {
    email : { type : String, required : true },
    first : { type : String, required : true },
    last : { type : String, required : true },
    mobile : { type : String, required : true },
    type : { type : String, required : true },
    status : { type : String, required : true },
    reject : {
      default : null,
      type : String,
    },
    address : {
      suburb : { type : String, required : true },
      state : { type : String, required : true },
      postcode : { type : Number, required : true },
    },
    profile : {
      resume : { type : String, required : true },
      experience : { type : String, required : true },
      situation : { type : String, required : true },
      license : { type : String, required : true },
      school : { type : String, required : true },
      referral : { type : String, default : '' },
      subjects : [ String ],
    },
    interview : {
      booking_link : {
        type : String,
        default : null,
      },
      date : {
        type : Date,
        default : null,
      },
      room : {
        type : String,
        default : null,
      },
      pre_answers : {
        type : String,
        default : null,
      },
      notes : {
        type : String,
        default : null,
      },
      outcome : {
        type : String,
        default : null,
      },
    },
    onboarding : {
      status : {
        type : String,
        default : null,
      },
      started : {
        type : String,
        default : null,
      },
      completed : {
        type : String,
        default : null,
      },
      percentage : {
        type : String,
        default : null,
      },
      current_module : {
        type : String,
        default : null,
      },
    },
    reminder : {
      enabled : {
        type : Boolean,
        default : null,
      },
      level : {
        type : Number,
        default : null,
      },
      last_sent : {
        type : String,
        default : null,
      },
    },
  },
  { timestamps : true },
);

const userModel = mongoose.model<userDocument>( 'User', userSchema );

export default userModel;