import express from "express";
import { postImage, postUpload } from "../controller/productConttroller";
import auth from "../middleware/auth";

const productRouter = express.Router();

productRouter.post("/upload", auth, postUpload);
productRouter.post("/image", auth, postImage);

export default productRouter;
