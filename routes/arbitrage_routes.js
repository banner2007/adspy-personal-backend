import express from "express";
import { ExchangeManager } from "../services/exchange_manager.js";

const router = express.Router();
const manager = new ExchangeManager();

router.get("/check/:symbol", async (req, res) => {
  try {
    const symbol = req.params.symbol;

    const binance = await manager.getExchange("binance").getPrice(symbol);
    const bitbex = await manager.getExchange("bitbex").getPrice(symbol);

    res.json({
      symbol,
      binance: binance.price || binance.last,
      bitbex: bitbex.price || bitbex.last,
      difference:
        (parseFloat(binance.price) - parseFloat(bitbex.price)).toFixed(4)
    });
  } catch (err) {
    res.json({ error: err.message });
  }
});

export default router;
