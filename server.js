// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const dbConnect = require("./app/dbConnect/dbConnect");
// const { PORT } = require("./config");
// const userRoutes = require("./app/routes/userRoutes");
// const app = express();
// app.use(express.json());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//     allowedHeaders: ["Content-Type", "application/json"],
//     maxAge: 3600,
//     optionsSuccessStatus: 200,
//   })
// );
// app.use(userRoutes);
// dbConnect()
//   .then((val) => {
//     app.listen(PORT, () => {
//       console.log(`Server running at port:${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });


require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./app/dbConnect/dbConnect");
const { PORT } = require("./config");
const userRoutes = require("./app/routes/userRoutes");
const app = express();

// var allowCrossDomain = function(req, res, next) {
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
//     // console.log("===== request :: ", req);

// }





app.use(express.json());
// app.use(cors({ 
//   origin: "https://d256-2401-4900-1c6e-c7a0-91f0-5fd3-7c07-e4d2.ngrok-free.app", 
//   'Access-Control-Allow-Origin': 'http://localhost:3000'
// }));

const corsOption = {
  origin: "*",
  methods: ['GET', 'PUT', 'POST', 'HEAD', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Headers'],
  credentials: true,
}
app.use(cors(corsOption));
app.use(userRoutes);


// app.use(
//   cors({
//     origin: 'http://localhost:3000, https://c5c0-2401-4900-1c6e-273e-7cec-1572-3f18-f31a.ngrok-free.app ',
//   methods: ['GET', 'PUT', 'POST'],
//   allowedHeaders: ['Content-Type', 'Authorization']
//     // "Access-Control-Allow-Origin":["http://localhost:3000/"],
//     // "Access-Control-Allow-Methods":['GET', 'PUT', 'POST'],
//     // "Access-Control-Allow-Headers":['Content-Type', 'Authorization']
//   })
// );




// app.all('/*', function(req, res, next) {
//     console.log("===== request :: ", req);
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next();
//   });





dbConnect()
  .then((val) => {
    app.listen(PORT, () => {
      console.log(`Server running at port:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
