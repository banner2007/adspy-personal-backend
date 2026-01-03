const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend AdSpy funcionando correctamente 🚀");
});

app.get("/api/ads/search", async (req, res) => {
  const keyword = req.query.keyword;
  if (!keyword) {
    return res.status(400).json({ error: "Falta keyword" });
  }

  // 🔒 Modo seguro (Railway NO scrapea)
  return res.json({
    keyword,
    total: 0,
    ads: [],
    message: "Backend OK. Scraping desactivado en Railway."
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Servidor corriendo en http://localhost:" + PORT);
});
