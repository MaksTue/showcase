import express from "express";
import { projectsRouter } from "./routes/projectRoutes.js";

const app = express();

app.use("/projects", projectsRouter);

app.get("/health", (req, res) => {
  res.send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});