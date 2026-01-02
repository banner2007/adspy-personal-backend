const express = require("express");
const router = express.Router();

const {
  searchAds,
  analyzeAdWithAI
} = require("../services/metaAds.service");

router.get("/search", async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({ error: "Keyword requerida" });
    }

    const ads = await searchAds(keyword);
    res.json(ads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/analyze", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Texto del anuncio requerido" });
    }

    const analysis = await analyzeAdWithAI(text);
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
