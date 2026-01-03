import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Backend AdSpy funcionando correctamente 🚀");
});

app.get("/api/ads/search", async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({
        error: "Debes enviar el parámetro ?keyword="
      });
    }

    const token = process.env.META_ACCESS_TOKEN;

    if (!token) {
      return res.status(500).json({
        error: "META_ACCESS_TOKEN no configurado"
      });
    }

    const response = await axios.get(
      "https://graph.facebook.com/v19.0/ads_archive",
      {
        params: {
          search_terms: keyword,
          ad_type: "ALL",
          ad_reached_countries: "US", // 🔥 STRING, NO ARRAY
          fields: [
            "id",
            "ad_creation_time",
            "ad_creative_body",
            "ad_creative_link_title",
            "ad_snapshot_url",
            "page_name"
          ].join(","),
          limit: 10,
          access_token: token
        }
      }
    );

    res.json(response.data);

  } catch (error) {
    console.error("ERROR META:", error.response?.data || error.message);

    res.status(500).json({
      error: "Error consultando Meta Ad Library",
      details: error.response?.data || error.message
    });
  }
});

app.listen(PORT, () => {
  console.log("TOKEN META:", process.env.META_ACCESS_TOKEN ? "OK" : "NO LEÍDO");
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
