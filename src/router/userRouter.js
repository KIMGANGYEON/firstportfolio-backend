import express from "express";
import {
  getAuth,
  postEdit,
  postJoin,
  postLogin,
  postLogout,
} from "../controller/userController";
import auth from "../middleware/auth";

const userRouter = express.Router();

userRouter.get("/auth", auth, getAuth);
userRouter.post("/join", postJoin);
userRouter.post("/login", postLogin);
userRouter.post("/edit", postEdit);
userRouter.post("/logout", auth, postLogout);

export default userRouter;
