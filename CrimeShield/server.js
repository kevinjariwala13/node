require("dotenv").config();
const express = require("express");
require("./ConnectDatabase");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const users = require("./Models/UserModel");
const incident = require("./Models/Incident");
const suspect = require("./Models/Suspect");
const { SESSION_SECRET } = process.env;
const passport = require("passport");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const IncidentRoute = require("./Routes/incidentRoute");
const suspectRoute = require("./Routes/suspectRoute");
const app = express();

app.set("trust proxy", 1);
// app.use(express.static(path.join(__dirname, "public/evidence")));
app.use(express.static("public"));
// To parse data in incoming requests.
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// To use cookies and sessions in your application.
app.use(cookieParser(SESSION_SECRET));
app.use(
  expressSession({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      // sameSite: "None",
      // secure: true,
      // httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(morgan("dev"));
// To Enable Requests from CLIENT_URL.
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers, *, Access-Control-Allow-Origin",
    "Origin, X-Requested-with, Content_Type,Accept,Authorization",
    "http://localhost:3000"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    return res.status(200).json({});
  }
  next();
});

// To integrate Passport strategies with the Server.
require("./Utilities/PassportConfig");
app.use(passport.initialize());
app.use(passport.session());

app.use("/user", require("./Routes/UserRoute"));
app.use("/incident", IncidentRoute);
app.use("/suspect", suspectRoute);

// To handle errors in your application.
app.use((err, req, res, next) => {
  const status = 500;
  console.log(err);
  if (err.name === "InternalOAuthError") {
    return res.redirect("http://localhost:3000");
  } else {
    return res.status(status).json({ msg: "Internal Server Error!", err });
  }
});

app.listen(5000, () => {
  console.log("Server Running on Port 5000!");
});
