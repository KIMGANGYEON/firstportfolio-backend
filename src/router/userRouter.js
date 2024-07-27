import express from "express";
import {
  getAuth,
  postEdit,
  postJoin,
  postLogin,
  postLogout,
} from "../controller/userController";
import auth from "../middleware/auth";

const userRooter = express.Router();

userRooter.get("/auth", auth, getAuth);
userRooter.post("/join", postJoin);
userRooter.post("/login", postLogin);
userRooter.post("/edit", postEdit);
userRooter.post("/logout", auth, postLogout);

export default userRooter;
