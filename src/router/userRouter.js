import express from "express";
import { postJoin } from "../controller/userController";

const userRooter = express.Router();

userRooter.post("/join", postJoin);

export default userRooter;
