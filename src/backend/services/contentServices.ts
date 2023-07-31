import { FilterQuery } from "mongoose";
import { contentDocument, contentModel } from "../models/courseModel";

interface content {
    createContent : (payload : contentDocument) =>Promise<contentDocument>;
    findOneContent : (searchQuery : FilterQuery<contentDocument>)=>Promise<contentDocument|null>;
};

const contentServices:content = {
    
    /**
     * service to create the content
     * @param payload 
     * @returns 
     */
    createContent : async (payload) =>{
        return await contentModel.create(payload);
    },

    /**
     * service to find the content
     * @param searchQuery 
     * @returns 
     */
    findOneContent : async (searchQuery) =>{
        return await contentModel.findOne(searchQuery);
    }
}

export default contentServices;