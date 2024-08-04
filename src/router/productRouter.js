import express from "express";
import {
  getProduct,
  postImage,
  postUpload,
} from "../controller/productConttroller";
import auth from "../middleware/auth";

const productRouter = express.Router();

productRouter.get("/get", getProduct);
productRouter.post("/upload", auth, postUpload);
productRouter.post("/image", auth, postImage);

export default productRouter;
