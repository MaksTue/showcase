import pool from "../db.js";

export async function getProject(req, res, next) {
  const projectId = req.params.projectId;
  try {
    const projectQuery = `
        SELECT p.*, t.name AS track_name
        FROM Projects p
        JOIN Tracks t ON p.track = t.id
        WHERE p.id = $1
      `;
    const { rows } = await pool.query(projectQuery, [projectId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Project not found" });
    }
    const project = rows[0];
    res.json(project);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function getProjectUsers(req, res, next) {
  const projectId = req.params.projectId;
  try {
    const usersQuery = `
        SELECT u.*
        FROM Users u
        JOIN ProjectUsers pu ON u.id = pu.user_id
        WHERE pu.project_id = $1
      `;
    const usersResult = await pool.query(usersQuery, [projectId]);

    res.json(usersResult.rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
