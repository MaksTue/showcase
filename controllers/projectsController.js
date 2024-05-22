import * as projectService from "../services/projectService.js";

export async function getProject(req, res, next) {
  const projectId = req.params.projectId;
  try {
    const project = await projectService.getProjectById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    console.error("Error getting project", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getProjectUsers(req, res, next) {
  const projectId = req.params.projectId;
  try {
    const users = await projectService.getProjectUsersById(projectId);
    res.json(users);
  } catch (error) {
    console.error("Error getting project users", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
