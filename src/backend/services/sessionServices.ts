import { FilterQuery } from "mongoose";
import sessionModel, { sessionDocument } from "../models/sessionModel";

interface sessionServices {
  createSession : (session : sessionDocument) => Promise<sessionDocument>;
  findOneSession : (searchQuery: FilterQuery<sessionDocument>) => Promise<sessionDocument|null>;
}

const sessionService : sessionServices = {
  createSession : async (session) => {
    return await sessionModel.create(session);
  },
  findOneSession : async (searchQuery) =>{
    return await sessionModel.findOne(searchQuery);
  }
}

export default sessionService;