const mongoose = require( 'mongoose' );
const adminSchema = new mongoose.Schema( {
  email : {
    type : String,
    required : true,
  },
  password : {
    type : String,
    required : true,
  },
  isAdmin : {
    type : Boolean,
  },
} );
const adminModel = mongoose.model( 'Admin', adminSchema );
module.exports = adminModel;
