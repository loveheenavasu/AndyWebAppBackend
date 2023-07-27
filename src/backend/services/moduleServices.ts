import { FilterQuery } from "mongoose";
import { moduleDocument, moduleModel } from "../models/courseModel";

interface module {
    createModule : (payload : moduleDocument)=>Promise<moduleDocument>;
    findOneModule : (searchQuery : FilterQuery<moduleDocument>)=>Promise<moduleDocument|null>;
};

const moduleServices :module= {
    createModule : async (payload: any) =>{
        return await moduleModel.create(payload);
    },
    findOneModule : async (searchQuery) =>{
        return await moduleModel.findOne(searchQuery);
    }
};

export default moduleServices;