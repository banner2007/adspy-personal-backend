import express from "express";
import {
  publicRequest,
  signedRequest,
  signedPost
} from "../services/binance.js";

const router = express.Router();

// Tiempo del servidor
router.get("/time", async (req, res) => {
  try {
    const data = await publicRequest("/api/v3/time");
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Precio actual
router.get("/price/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;
    const data = await publicRequest(`/api/v3/ticker/price?symbol=${symbol}`);
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Order book
router.get("/orderbook/:symbol", async (req, res) => {
  try {
    const { symbol } = req.params;
    const data = await publicRequest(
      `/api/v3/depth?symbol=${symbol}&limit=50`
    );
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Cuenta - Info general
router.get("/account", async (req, res) => {
  try {
    const data = await signedRequest("/api/v3/account");
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Crear orden
router.post("/order", async (req, res) => {
  try {
    const { symbol, side, type, quantity } = req.body;
    const data = await signedPost("/api/v3/order", {
      symbol,
      side,
      type,
      quantity
    });
    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
