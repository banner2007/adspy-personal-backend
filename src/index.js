const express = require("express");
const cors = require("cors");
const scrapeAdLibrary = require("./scraper");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend Scraping funcionando 🚀");
});

app.get("/api/ads/search", async (req, res) => {
  const keyword = req.query.keyword;
  if (!keyword) {
    return res.status(400).json({ error: "keyword requerido" });
  }

  try {
    const ads = await scrapeAdLibrary(keyword);
    res.json({ ads });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error scraping Ad Library" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
