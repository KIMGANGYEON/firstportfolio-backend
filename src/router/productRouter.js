import express from "express";
import {
  getProduct,
  postImage,
  postUpload,
  postUsedProduct,
} from "../controller/productConttroller";
import auth from "../middleware/auth";

const productRouter = express.Router();

productRouter.get("/get", getProduct);
productRouter.post("/upload", auth, postUpload);
productRouter.post("/image", auth, postImage);
productRouter.post("/used/detail/:id", postUsedProduct);

export default productRouter;
