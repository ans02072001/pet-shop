import express from "express";
import animalsRoutes from "./routes/AnimalsRouter";

const app = express();
app.use(express.json());

app.use("/api", animalsRoutes);

export default app;
