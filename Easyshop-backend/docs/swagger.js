const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "EasyShop API",
    description: "User Management API",
  },
  host: process.env.URL,
  schemes: [process.env.protocol],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["../app.js"];

// Generate swagger doc
swaggerAutogen(outputFile, endpointsFiles, doc);
