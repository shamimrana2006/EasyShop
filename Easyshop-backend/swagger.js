const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "EasyShop API",
    description: "User Management API",
  },
  host: "https://easy-shop-backend-mocha.vercel.app",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.js"];

// Generate swagger doc
swaggerAutogen(outputFile, endpointsFiles, doc);
