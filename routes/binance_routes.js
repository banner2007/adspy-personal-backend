import express from "express";
import { BinanceService } from "../services/binance_service.js";

const router = express.Router();
const binance = new BinanceService();

router.get("/time", async (req, res) => {
  try {
    res.json(await binance.getServerTime());
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.get("/account", async (req, res) => {
  try {
    res.json(await binance.getAccount());
  } catch (err) {
    res.json({ error: err.message });
  }
});

router.get("/price/:symbol", async (req, res) => {
  try {
    res.json(await binance.getPrice(req.params.symbol));
  } catch (err) {
    res.json({ error: err.message });
  }
});

export default router;
