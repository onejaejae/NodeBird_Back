import express from "express";
import {
  createUser,
  loginUser,
  logoutUser,
} from "../controllers/userController";

const userRoute = express.Router();

userRoute.post("/login", loginUser);
userRoute.post("/logout", logoutUser);
userRoute.post("/", createUser);

export default userRoute;
