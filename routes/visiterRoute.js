import express from "express";
import { createVisiter, getVisiters, getOneIdVisiters, deleteVisiter } from "../controllers/VisiterControllers.js";

const router = express.Router();

//ROUTES
router.post("/create", createVisiter);
router.get("/get", getVisiters);
router.get("/getOne/:id", getOneIdVisiters)
router.delete("/delete/:id", deleteVisiter);

export default router;