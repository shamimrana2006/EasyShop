require("dotenv").config();
const origins = [process.env.origin1, process.env.origin2];
const CORS_LOCAL = process.env.CORS_LOCAL;

const corseSEtup = {
  origin: (origin, callback) => {
    if (!CORS_LOCAL) {
      return callback(null, true);
    }

    console.log(origins, origin);
    if (origins.includes(origin)) {
      return callback(null, true);
    } else {
      console.log(origins, origin);
      callback(new Error("origin not accepted by cors"));
    }
  },
  credentials: true,
};

module.exports = { corseSEtup };
