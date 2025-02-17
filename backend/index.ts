import express from "express";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use("/tasks", taskRoutes);
app.use("/auth", userRoutes);

app
  .listen(PORT, () => {
    console.log(`Application running on port ${PORT}`);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });
