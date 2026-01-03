import express from "express";
import cors from "cors";
import adsScrapeRoutes from "./routes/adsScrape.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/ads", adsScrapeRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
