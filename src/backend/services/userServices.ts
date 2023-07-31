import { FilterQuery, UpdateQuery } from "mongoose";
import userModel, { userDocument } from "../models/userModel";

interface UserService {
  createUser: (payload: Partial<userDocument>) => Promise<userDocument>;
  findOneUser: (
    searchQuery: FilterQuery<userDocument>,
    projectionQuery?: any
  ) => Promise<userDocument | null>;
}

const userServices: UserService = {
  /**
   * service to create the user
   * @param payload 
   * @returns 
   */
  createUser: async (payload) => {
    return await userModel.create(payload);
  },

  /**
   * service to find the user
   * @param searchQuery 
   * @param projectionQuery 
   * @returns 
   */
  findOneUser: async (searchQuery, projectionQuery) => {
    return await userModel.findOne(searchQuery, projectionQuery).exec();
  },
};

export default userServices;
