import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./router/userRouter";
dotenv.config();

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

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

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.send(error.message || "서버에서 에러가 났습니다");
});

app.listen(port, () => {
  console.log(`🔥app listen http://localhost:${port}`);
});
