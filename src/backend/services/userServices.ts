import { FilterQuery, UpdateQuery } from "mongoose";
import userModel, { userDocument } from "../models/userModel";
// import dbConnect from "../startUp/dbConnect";

// dbConnect();

interface UserService {
  createUser: (payload: Partial<userDocument>) => Promise<userDocument>;
  findOneUser: (
    searchQuery: FilterQuery<userDocument>,
    projectionQuery?: any
  ) => Promise<userDocument | null>;
}

const userServices: UserService = {
  createUser: async (payload) => {
    return await userModel.create(payload);
  },
  findOneUser: async (searchQuery, projectionQuery) => {
    return await userModel.findOne(searchQuery, projectionQuery).exec();
  },
};

export default userServices;
