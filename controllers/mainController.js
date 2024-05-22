import * as mainService from "../services/mainService.js";

export async function getUserFavorites(req, res, next) {
  const userId = 1; // Временно userId в 1
  try {
    const favorites = await mainService.getUserFavoritesById(userId);
    res.json(favorites);
  } catch (error) {
    console.error("Error getting user favorites", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getLastYearProjects(req, res, next) {
  try {
    const projects = await mainService.getLastYearProjects();
    res.json(projects);
  } catch (error) {
    console.error("Error getting last year projects", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getTracks(req, res, next) {
  try {
    const tracks = await mainService.getTracks(); // Используем сервис для получения треков
    res.json(tracks);
  } catch (error) {
    console.error("Error getting tracks", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
