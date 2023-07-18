const mongoose = require( 'mongoose' );
const { DATABASEURL } = require( '../../config' );
/**
 * data connection
 */
async function dbConnect () {
  try {
    await mongoose.connect( DATABASEURL );
    console.log( 'DataBase connected successfully' );
  } catch ( error ) {
    console.error( 'Database connection error', error );
  }
}

module.exports = dbConnect;
