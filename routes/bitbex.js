import express from "express";
import axios from "axios";

const router = express.Router();
const base = "https://api.bitbex.net";

router.get("/ticker", async (req, res) => {
  try {
    const symbol = req.query.symbol;
    const r = await axios.get(`${base}/v1/ticker?symbol=${symbol}`);
    res.json(r.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/orderbook", async (req, res) => {
  try {
    const symbol = req.query.symbol;
    const r = await axios.get(`${base}/v1/orderbook?symbol=${symbol}`);
    res.json(r.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
