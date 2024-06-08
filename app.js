import express from "express";
import cors from "cors";
import { projectsRouter } from "./routes/projectRoutes.js";

import { mainRouter } from "./routes/mainRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/projects", projectsRouter);

app.use("/", mainRouter);

app.get("/health", (req, res) => {
  res.send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
