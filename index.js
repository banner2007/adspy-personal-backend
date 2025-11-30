import express from "express";
import cors from "cors";

import binanceRoutes from "./routes/binance_routes.js";
import bitbexRoutes from "./routes/bitbex_routes.js";
import arbitrageRoutes from "./routes/arbitrage_routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/binance", binanceRoutes);
app.use("/bitbex", bitbexRoutes);
app.use("/arbitrage", arbitrageRoutes);

app.get("/", (req, res) => {
  res.send("Backend Arbitraje Activo");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor activo en puerto:", PORT));
