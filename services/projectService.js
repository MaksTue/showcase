import pool from "../db.js";

export async function getProjectById(projectId) {
  try {
    const projectQuery = `
        SELECT p.*, t.name AS track_name
        FROM Projects p
        JOIN Tracks t ON p.track = t.id
        WHERE p.id = $1
      `;
    const { rows } = await pool.query(projectQuery, [projectId]);
    return rows.length === 0 ? null : rows[0];
  } catch (error) {
    console.error("Error executing query", error);
    throw new Error("Internal server error");
  }
}

export async function getProjectUsersById(projectId) {
  try {
    const usersQuery = `
        SELECT u.*
        FROM Users u
        JOIN ProjectUsers pu ON u.id = pu.user_id
        WHERE pu.project_id = $1
      `;
    const usersResult = await pool.query(usersQuery, [projectId]);
    return usersResult.rows;
  } catch (error) {
    console.error("Error executing query", error);
    throw new Error("Internal server error");
  }
}
