import pool from "../db.js";

export async function getUserFavoritesById(userId) {
  try {
    const favoritesQuery = `
        SELECT favorite_projects
        FROM User_account
        WHERE id = $1
      `;
    const favoritesResult = await pool.query(favoritesQuery, [userId]);
    if (favoritesResult.rows.length === 0) {
      throw new Error("User not found");
    }
    return favoritesResult.rows[0].favorite_projects;
  } catch (error) {
    console.error("Error executing query", error);
    throw new Error("Internal server error");
  }
}

export async function getLastYearProjects() {
  try {
    const projectsQuery = `
      SELECT last_year_projects
      FROM last_year
    `;
    const projectsResult = await pool.query(projectsQuery);
    return projectsResult.rows[0].last_year_projects;
  } catch (error) {
    console.error("Error executing query", error);
    throw new Error("Internal server error");
  }
}

export async function getTracks() {
  try {
    const tracksQuery = `
      SELECT id, name
      FROM Tracks
    `;
    const tracksResult = await pool.query(tracksQuery);
    return tracksResult.rows;
  } catch (error) {
    console.error("Error executing query", error);
    throw new Error("Internal server error");
  }
}
