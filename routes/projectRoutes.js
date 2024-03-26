import express from "express";
import * as projectController from "../controllers/projectsController.js";

export const projectsRouter = express.Router();

projectsRouter.get("/:projectId", projectController.getProject);
projectsRouter.get("/:projectId/users", projectController.getProjectUsers);
