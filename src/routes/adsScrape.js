import express from "express";
import { scrapeAdLibrary } from "../services/adLibraryScraper.js";

const router = express.Router();

router.get("/scrape", async (req, res) => {
  try {
    const { keyword, country } = req.query;

    if (!keyword) {
      return res.status(400).json({
        error: "Falta el parámetro keyword",
      });
    }

    const result = await scrapeAdLibrary({ keyword, country });

    res.json({
      ok: true,
      keyword,
      country,
      result,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error haciendo scraping",
      details: error.message,
    });
  }
});

export default router;
