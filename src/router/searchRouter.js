import express from "express";
import { getUsed } from "../controller/searchController";

const searchRouter = express.Router();

searchRouter.post("/used", getUsed);

export default searchRouter;
