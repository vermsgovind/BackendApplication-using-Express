import express from "express";

import {getTutorialByID, getAllTutorialByTitle, createTutorial,deleteAllTutorial, deleteTutorialById} from "../controller/tutorial.js";
import {middlewareFn} from "../middleware/index.js";
const authJWT = middlewareFn.authJWT;
const router = express.Router();

router.get("/:id",[authJWT.verifyToken],getTutorialByID); // open for all
router.get("/",[authJWT.verifyToken], getAllTutorialByTitle); // open for all
router.post("/",[authJWT.verifyToken,authJWT.isAdmin],createTutorial); // open for only admin
router.delete("/",[authJWT.verifyToken,authJWT.isModertorOrAdmin],deleteAllTutorial); // open for both admin or moderator
router.delete("/:id",[authJWT.verifyToken,authJWT.isModerator],deleteTutorialById); // open for moderator only
// router.put("/:id",updateTutorialById);

export default router;