require( 'dotenv' ).config();
const express = require( 'express' );
const cors = require( 'cors' );
const dbConnect = require( './app/dbConnect/dbConnect' );
const { PORT } = require( './config' );
const onBoardingRoutes = require( './app/routes/onBoardingRoutes' );
const adminRoutes = require( './app/routes/adminRoutes' );
const app = express();
app.use( cors() );
app.use( express.json() );
app.use( onBoardingRoutes );
app.use( adminRoutes );
dbConnect()
  .then( () => {
    app.listen( PORT, () => {
      console.log( `Server running at port:${PORT}` );
    } );
  } )
  .catch( ( err ) => {
    console.log( err );
  } );
