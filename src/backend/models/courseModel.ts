import mongoose, { Document } from "mongoose";

export interface courseDocument extends Document {
  name : string,
  description : string,
  modules : mongoose.Types.ObjectId[]
};

const courseSchema  = new mongoose.Schema<courseDocument>( {
  name : {
    type : String,
    required : true,
  },
  description : {
    type : String,
    required : true,
  },
  modules : [ { type : mongoose.Types.ObjectId, ref : 'Module' } ],
}, { timestamps : true } );

export interface moduleDocument extends Document {
  name : string,
  description : string,
  content : mongoose.Types.ObjectId[]
}

const moduleSchema = new mongoose.Schema<moduleDocument>( {
  name : {
    type : String,
    required : true,
  },
  description : {
    type : String,
    required : true,
  },
  content : [ { type : mongoose.Types.ObjectId, ref : 'Content' } ],
}, { timestamps : true } );

export interface contentDocument extends Document {
  name : string,
  description : string,
  type : string,
  duration : number,
  questions : mongoose.Types.ObjectId[]
}

const contentSchema = new mongoose.Schema<contentDocument>( {
  name : {
    type : String,
    required : true,
  },
  description : {
    type : String,
    required : true,
  },
  type : {
    type : String,
    required : true,
  },
  duration : { type : Number, defaut : 0 },
  questions : [ { type : mongoose.Types.ObjectId, ref : 'Question' } ],
}, { timestamps : true } );

export interface questionDocument extends Document {
  question: string;
  option: string[];
  answer: number;
}

const questionSchema = new mongoose.Schema<questionDocument>( {
  question : {
    type : String,
    required : true,
  },
  option : [ String ],
  answer : Number,
}, { timestamps : true } );

const courseModel = mongoose.model<courseDocument>("Course", courseSchema);

const moduleModel = mongoose.model<moduleDocument>("Module", moduleSchema);

const contentModel = mongoose.model<contentDocument>("Content", contentSchema);

const questionModel = mongoose.model<questionDocument>("Question", questionSchema);

export { courseModel, moduleModel, contentModel, questionModel };
