require("dotenv").config();
const origins = [process.env.origin1, process.env.origin2, process.env.URL];
const CORS_LOCAL = process.env.CORS_LOCAL;

const corseSEtup = {
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true);
    }

    if (!CORS_LOCAL) {
      return callback(null, true);
    }

    ////(origins, origin);
    if (origins.includes(origin)) {
      return callback(null, true);
    } else {
      ////(origins, origin);
      console.log("x cors bloocked:", origin);

      callback(new Error("origin not accepted by cors"));
    }
  },
  credentials: true,
};

module.exports = { corseSEtup };
