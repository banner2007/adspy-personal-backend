const express = require("express");
const cors = require("cors");

let scrapeAdLibrary = null;

// ⛔ El scraper SOLO se carga si está habilitado
if (process.env.ENABLE_SCRAPING === "true") {
  try {
    scrapeAdLibrary = require("./scraper");
    console.log("✅ Scraper cargado correctamente");
  } catch (err) {
    console.error("❌ Error cargando scraper:", err.message);
  }
}

const app = express();
app.use(cors());

// --------------------
// Health check
// --------------------
app.get("/", (req, res) => {
  res.send("Backend AdSpy funcionando correctamente 🚀");
});

// --------------------
// Ads search
// --------------------
app.get("/api/ads/search", async (req, res) => {
  const keyword = req.query.keyword;

  if (!keyword) {
    return res.status(400).json({ error: "Falta keyword" });
  }

  // 🔒 Modo seguro (scraping apagado)
  if (process.env.ENABLE_SCRAPING !== "true") {
    return res.json({
      keyword,
      total: 0,
      ads: [],
      message: "Backend OK. Scraping aún no activado."
    });
  }

  // 🚨 Scraper no disponible
  if (!scrapeAdLibrary) {
    return res.status(500).json({
      error: "Scraper no disponible en el servidor"
    });
  }

  try {
    const ads = await scrapeAdLibrary(keyword);
    res.json({
      keyword,
      total: ads.length,
      ads
    });
  } catch (error) {
    console.error("SCRAPING ERROR:", error);
    res.status(500).json({
      error: "Error scraping Ad Library"
    });
  }
});

// --------------------
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Servidor corriendo en http://localhost:" + PORT);
});
