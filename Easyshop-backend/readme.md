# **EasyShop** _Backend_
### Endpoint 
_http://localhost:2006_
########
_https://easy-shop-backend-mocha.vercel.app_
- /join
    - /registration
    - /login
    - /resetDB
    - /profile
    - /get-otp-verify
    - /check-otp-verify
    - /reset_password_opt
    - /reset_password
- /user
- /admin
- /product
- /seller 

### Deploy in vercel
- **deploy issue** // use vercel.json for nested routing
- **.env handle**
  - mongoDB url (atlas and local) for offline codding
  - originLocal, deployedOrigin
- **cors**
  - (localhost Origin and deployed origin)
  - cors for postman req.secure = undefined
  - must use credential for cookie
- **cookie not set problem**
  - http, secure , samesite, maxAge handle with isSecure for both environment (vercel and local)
  - use must be app.enable("proxy trust") for (https) vercel

### problems && setup guided backend

- initial setup
  - app.enable("trust proxy"); // for vercel https enable
  - modngoDBconnection(); // not middleware only function call
  - app.use(cors(corseSEtup)); // cors setup
  - app.use(cookieParser()); // get cookie
  - app.use(express.json()); // receive
  - app.use(express.urlencoded({ extended: true })); // for from data collection
  - app.use(passport.initialize());
    -passport initialize not passport-jwt its only passport when you use any package from passport.js then use it must like passport-jwt, passport-google, passport-github

- other issue :

    - **import / ES6** // when you use import then use export only but when you use require then use must be module.export 
    - **schema email candidate key** // must be use sparse: true because it ignore duplicate error for several time save empty email
    - **use validator middleware** // because ifelse create huge ugly code