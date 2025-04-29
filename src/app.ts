import express, { Application } from "express";
import cors from "cors";
import { authMiddleware } from "./middlewares/authMiddleware";
import authRoute from "./routes/authRoute";
import todoRoute from "./routes/todoRoute";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRoute);

app.use(authMiddleware);

app.use("/api/checklist", todoRoute);

export default app;
