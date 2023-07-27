import { NextApiRequest, NextApiResponse } from "next";
import sessionService from "../services/sessionServices";
import userServices from "../services/userServices";

interface helperFunctionInterface {
  verifyUser: (req: NextApiRequest, res: NextApiResponse) => Promise<any>;
  getUser: (userId: string) => Promise<any>;
}

const helperFunction: helperFunctionInterface = {
  verifyUser: async (req, res) => {
    const session = await sessionService.findOneSession({
      token: req.headers.authorization,
    });
    if (!session) {
      return false;
    }
    const userId = session.userId;
    return userId;
  },

  getUser: async (userId) => {
    const user = await userServices.findOneUser({ _id: userId });
    if (!user) {
      return null;
    }
    return user;
  },
};
export default helperFunction;
