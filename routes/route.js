import express from "express";
import { getUserFsls, getOneUserFsls, createFsl, deleteFsl } from "../controllers/fsl.js";

const router = express.Router();

//ROUTES
router.post("/createFsl", createFsl);//add a Fsl
router.get("/getUserFsls", getUserFsls);//fetch all Fsls  
router.get("/getOneUserFsls/:id", getOneUserFsls) //getByIdFsls
router.delete("/deleteFsl/:id", deleteFsl); //delete a Fsl
// router.put("/updateFsl/:id", isLoggedIn, updateFsl)

export default router;