import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;
const META_TOKEN = process.env.META_ACCESS_TOKEN;
console.log("TOKEN META:", process.env.META_ACCESS_TOKEN ? "OK" : "NO LEÍDO");


// 🔎 ENDPOINT DE BÚSQUEDA
app.get("/api/ads/search", async (req, res) => {
  try {
    const { keyword = "test" } = req.query;

    if (!META_TOKEN) {
      return res.status(500).json({
        error: "META_ACCESS_TOKEN no está configurado en Railway"
      });
    }

    const url = "https://graph.facebook.com/v19.0/ads_archive";

    const response = await axios.get(url, {
      params: {
        search_terms: keyword,
        ad_type: "ALL",
        ad_reached_countries: "US",
        fields: "ad_creative_body,ad_snapshot_url,page_name",
        access_token: META_TOKEN
      }
    });

    res.json(response.data);

  } catch (error) {
    console.error("ERROR META:", error.response?.data || error.message);

    res.status(500).json({
      error: "Error consultando Meta Ad Library",
      details: error.response?.data || error.message
    });
  }
});

// 🟢 HEALTH CHECK
app.get("/", (req, res) => {
  res.send("Backend AdSpy funcionando correctamente 🚀");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

