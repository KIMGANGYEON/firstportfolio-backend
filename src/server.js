import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./router/userRouter";
import path from "path";
import productRouter from "./router/productRouter";
import searchRouter from "./router/searchRouter";
dotenv.config();

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../uploads")));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅mongoose connect");
  })
  .catch((error) => {
    console.error(error);
  });

app.get("/", (req, res) => {
  return res.send("hello world!");
});

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/search", searchRouter);

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send(error.message || "서버에서 에러가 났습니다");
});

app.listen(port, () => {
  console.log(`🔥app listen http://localhost:${port}`);
});
