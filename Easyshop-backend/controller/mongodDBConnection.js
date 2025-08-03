const mongoose = require("mongoose");
require("dotenv").config();
const modngoDBconnection = async () => {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(process.env.URL_mongoDB);
    console.log("MongoDB Atlas connected.");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};

module.exports = {
  modngoDBconnection,
};
