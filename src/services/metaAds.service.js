const axios = require("axios");
const { analyzeTextWithGemini } = require("./gemini.service");

const META_API_URL = "https://graph.facebook.com/v19.0/ads_archive";

async function searchAds(keyword) {
  const response = await axios.get(META_API_URL, {
    params: {
      access_token: process.env.META_ACCESS_TOKEN,
      search_terms: keyword,
      ad_active_status: "ACTIVE",
      ad_reached_countries: "CO",
      languages: "es",
      limit: 10
    }
  });

  // Filtrado básico: anuncios con texto
  return response.data.data
    .filter(ad => ad.ad_creative_body)
    .map(ad => ({
      id: ad.ad_archive_id,
      page: ad.page_name,
      text: ad.ad_creative_body,
      start_date: ad.ad_delivery_start_time,
      snapshot: ad.ad_snapshot_url
    }));
}

async function analyzeAdWithAI(text) {
  return await analyzeTextWithGemini(text);
}

module.exports = {
  searchAds,
  analyzeAdWithAI
};
