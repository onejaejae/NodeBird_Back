import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";
import postRoute from "./routes/postRoute";
import userRoute from "./routes/userRoute";
import db from "../models";
const passportConfig = require("../passport");

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

passportConfig();
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/posts", postRoute);
app.use("/users", userRoute);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "존재하지 않는 API입니다." });
});

if (process.env.NODE_ENV === "development") {
  app.listen(process.env.PORT_DEV, () => {
    console.log(`Server is Running on ${process.env.PORT_DEV}`);
  });
} else {
  app.listen(process.env.PORT_PRO, () => {
    console.log(`Server is Running on ${process.env.PORT_PRO}`);
  });
}
