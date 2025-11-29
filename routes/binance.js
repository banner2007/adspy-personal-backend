import express from "express";
import axios from "axios";
import CryptoJS from "crypto-js";

const router = express.Router();
const apiKey = process.env.BINANCE_API_KEY;
const apiSecret = process.env.BINANCE_SECRET_KEY;
const base = "https://api.binance.com";

router.get("/time", async (req, res) => {
  try {
    const r = await axios.get(`${base}/api/v3/time`);
    res.json(r.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/ticker", async (req, res) => {
  try {
    const symbol = req.query.symbol;
    const r = await axios.get(`${base}/api/v3/ticker/price?symbol=${symbol}`);
    res.json(r.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/book", async (req, res) => {
  try {
    const symbol = req.query.symbol;
    const r = await axios.get(`${base}/api/v3/depth?symbol=${symbol}&limit=5`);
    res.json(r.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Account signed
router.get("/account", async (req, res) => {
  try {
    const timestamp = Date.now();
    const query = `timestamp=${timestamp}`;
    const signature = CryptoJS.HmacSHA256(query, apiSecret).toString();
    const r = await axios.get(`${base}/api/v3/account?${query}&signature=${signature}`, {
      headers: { "X-MBX-APIKEY": apiKey }
    });
    res.json(r.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Order – POST
router.post("/order", async (req, res) => {
  try {
    const { symbol, side, type, quantity } = req.body;
    const timestamp = Date.now();
    const params = `symbol=${symbol}&side=${side}&type=${type}&quantity=${quantity}&timestamp=${timestamp}`;

    const signature = CryptoJS.HmacSHA256(params, apiSecret).toString();

    const r = await axios.post(
      `${base}/api/v3/order?${params}&signature=${signature}`,
      {},
      { headers: { "X-MBX-APIKEY": apiKey } }
    );

    res.json(r.data);
  } catch (err) {
    res.status(500).json({ error: err?.response?.data || err.message });
  }
});

export default router;
