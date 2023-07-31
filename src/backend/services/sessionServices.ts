import { FilterQuery } from "mongoose";
import sessionModel, { sessionDocument } from "../models/sessionModel";

interface sessionServices {
  createSession : (session : sessionDocument) => Promise<sessionDocument>;
  findOneSession : (searchQuery: FilterQuery<sessionDocument>) => Promise<sessionDocument|null>;
}

const sessionService : sessionServices = {
  /**
   * service to create the session
   * @param session 
   * @returns 
   */
  createSession : async (session) => {
    return await sessionModel.create(session);
  },

  /**
   * service to find the session
   * @param searchQuery 
   * @returns 
   */
  findOneSession : async (searchQuery) =>{
    return await sessionModel.findOne(searchQuery);
  }
}

export default sessionService;