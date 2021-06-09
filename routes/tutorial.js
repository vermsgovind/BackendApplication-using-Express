import express from "express";

import {getTutorialByID, getAllTutorialByTitle, createTutorial,deleteAllTutorial, deleteTutorialById} from "../controller/tutorial.js";

const router = express.Router();

router.get("/:id",getTutorialByID);
router.get("/", getAllTutorialByTitle);
router.post("/",createTutorial);
router.delete("/",deleteAllTutorial)
router.delete("/:id",deleteTutorialById);
// router.put("/:id",updateTutorialById);
export default router;