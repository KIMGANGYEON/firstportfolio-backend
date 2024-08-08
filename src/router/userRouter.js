import express from "express";
import {
  deleteCart,
  getAuth,
  postCart,
  postEdit,
  postEditUserPassword,
  postEditUserProduct,
  postJoin,
  postLogin,
  postLogout,
  postPayment,
} from "../controller/userController";
import auth from "../middleware/auth";

const userRouter = express.Router();

userRouter.get("/auth", auth, getAuth);
userRouter.post("/join", postJoin);
userRouter.post("/login", postLogin);
userRouter.post("/logout", auth, postLogout);
userRouter.post("/edit", postEdit);
userRouter.post("/edit/password", postEditUserPassword);
userRouter.post("/edit/product", postEditUserProduct);
userRouter.post("/cart", auth, postCart);
userRouter.post("/payment", postPayment);
userRouter.delete("/carts", auth, deleteCart);

export default userRouter;
