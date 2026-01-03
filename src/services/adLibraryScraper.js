import axios from "axios";

export async function scrapeAdLibrary({ keyword, country }) {
  const url = "https://www.facebook.com/ads/library/";

  const params = {
    active_status: "all",
    ad_type: "all",
    country: country || "US",
    q: keyword,
  };

  const response = await axios.get(url, {
    params,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      "Accept-Language": "es-ES,es;q=0.9",
    },
  });

  return {
    htmlLength: response.data.length,
    message: "Página cargada correctamente (scraping base)",
  };
}
