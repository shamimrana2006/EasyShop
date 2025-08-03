const express = require("express");
require("dotenv").config()
const passport = require("passport");
const cors = require("cors");
var cookieParser = require("cookie-parser");
const {
  client_error,
  server_error,
} = require("./controller/response_controller");
const { userManagement_router } = require("./routers/user_Management_rout");
require("./controller/passportjwt");
const { modngoDBconnection } = require("./controller/mongodDBConnection");
const { corseSEtup } = require("./controller/Cors");
const app = express();


//-------------------------------------------------------initial setup-------------------------------
modngoDBconnection();
app.use(cors(corseSEtup));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
//-------------------------------------------------------routing-------------------------------

app.get("/", (req, res) => {
  res.send("shamim its work");
});

app.use("/join", userManagement_router);

// error handling:
app.use(client_error); //page not found error
app.use(server_error); // type mistake or another error

module.exports = app;
