const adminModel = require("../models/adminModel");

const adminServices={};
adminServices.createAdmin=async(payload)=>{
    return await adminModel(payload).save();
}
adminServices.findOneAdmin=async(searchQuery,projectionQuery)=>{
    console.log(searchQuery)
    return await adminModel.findOne(searchQuery,projectionQuery);
}
module.exports=adminServices;