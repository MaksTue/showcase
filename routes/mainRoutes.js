import express from "express";
import * as mainController from "../controllers/mainController.js";

export const mainRouter = express.Router();

mainRouter.get("/favorite", mainController.getUserFavorites);

mainRouter.get("/lastYear", mainController.getLastYearProjects);

mainRouter.get("/tracks", mainController.getTracks);
