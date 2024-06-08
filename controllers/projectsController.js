import * as projectService from "../services/projectService.js";

export async function listProjects(req, res, next) {
  try {
    const projects = await projectService.getProjects();
    res.json(projects);
  } catch (error) {
    console.error("Error listing projects", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

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

export async function createProject(req, res, next) {
  try {
    const projectData = req.body;
    const newProject = await projectService.addProject(projectData);
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Error creating project", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function deleteProjectController(req, res, next) {
  const projectId = req.params.projectId;
  try {
    const result = await projectService.deleteProject(projectId);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Error deleting project", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
