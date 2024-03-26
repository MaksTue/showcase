import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "showcaseuser",
  host: "db",
  database: "showcase",
  password: "root123",
  port: 5432,
});
export default pool;
