import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import binanceRoutes from "./routes/binance.js";
import bitbexRoutes from "./routes/bitbex.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/binance", binanceRoutes);
app.use("/bitbex", bitbexRoutes);

app.get("/", (req, res) => {
  res.send("API de Arbitraje funcionando correctamente.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
