const adminModel = require("../models/adminModel");

const adminServices={};

/**
 * serice to add the admin
 * @param {*} payload 
 * @returns 
 */
adminServices.createAdmin=async(payload)=>{
    return await adminModel(payload).save();
}

/**
 * service to search for the admin
 * @param {*} searchQuery 
 * @param {*} projectionQuery 
 * @returns 
 */
adminServices.findOneAdmin=async(searchQuery,projectionQuery)=>{
    console.log(searchQuery)
    return await adminModel.findOne(searchQuery,projectionQuery);
}

module.exports=adminServices;