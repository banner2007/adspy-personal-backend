import express from "express";
import { BitbexService } from "../services/bitbex_service.js";

const router = express.Router();
const bitbex = new BitbexService();

router.get("/account", async (req, res) => {
  try {
    res.json(await bitbex.getAccount());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// **AÑADIDO:** Soluciona el 404 para /bitbex/ticker
router.get("/ticker", async (req, res) => {
  try {
    res.json(await bitbex.getTicker());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/price/:symbol", async (req, res) => {
  try {
    res.json(await bitbex.getPrice(req.params.symbol));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
