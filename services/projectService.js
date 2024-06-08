import pool from "../db.js";

export async function getProjects() {
  try {
    const getProjectsQuery = `
      SELECT p.*, t.name AS track_name
      FROM Projects p
      JOIN Tracks t ON p.track = t.id;
    `;
    const { rows } = await pool.query(getProjectsQuery);
    return rows;
  } catch (error) {
    console.error("Error getting projects", error);
    throw new Error("Internal server error");
  }
}

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

export async function addProject(projectData) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const {
      title,
      track,
      goals,
      results,
      grade,
      repo,
      screenshots,
      thumbnail,
      pptxurl,
      tags,
      users,
    } = projectData;

    const addProjectQuery = `
      INSERT INTO Projects (title, track, goals, results, grade, repo, screenshots, thumbnail, pptxurl)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id
    `;
    const result = await client.query(addProjectQuery, [
      title,
      track,
      goals,
      results,
      grade,
      repo,
      screenshots,
      thumbnail,
      pptxurl,
    ]);
    const projectId = result.rows[0].id;

    if (tags && tags.length > 0) {
      const addProjectTagsQuery = `
        INSERT INTO project_tags (project_id, tag_id)
        VALUES ${tags.map((_, i) => `($1, $${i + 2})`).join(", ")}
      `;
      await client.query(addProjectTagsQuery, [projectId, ...tags]);
    }

    if (users && users.length > 0) {
      const addProjectUsersQuery = `
        INSERT INTO projectusers (project_id, user_id)
        VALUES ${users.map((_, i) => `($1, $${i + 2})`).join(", ")}
      `;
      await client.query(addProjectUsersQuery, [projectId, ...users]);
    }

    await client.query("COMMIT");
    return { id: projectId };
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error adding project", error);
    throw new Error("Internal server error");
  } finally {
    client.release();
  }
}

export async function deleteProject(projectId) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const deleteProjectTagsQuery = `
      DELETE FROM project_tags
      WHERE project_id = $1
    `;
    await client.query(deleteProjectTagsQuery, [projectId]);

    const deleteProjectUsersQuery = `
      DELETE FROM projectusers
      WHERE project_id = $1
    `;
    await client.query(deleteProjectUsersQuery, [projectId]);

    const deleteProjectQuery = `
      DELETE FROM Projects
      WHERE id = $1
    `;
    const result = await client.query(deleteProjectQuery, [projectId]);

    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error deleting project and related data", error);
    throw new Error("Internal server error");
  } finally {
    client.release();
  }
}
