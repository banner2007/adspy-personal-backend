import express from "express";
import cors from "cors";
import puppeteer from "puppeteer";

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Backend Scraper funcionando 🚀");
});

app.get("/api/ads/search", async (req, res) => {
  const keyword = req.query.keyword;

  if (!keyword) {
    return res.status(400).json({ error: "Falta keyword" });
  }

  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: "new"
    });

    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36"
    );

    const url = `https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=ALL&q=${encodeURIComponent(
      keyword
    )}`;

    await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
    await page.waitForTimeout(5000);

    const ads = await page.evaluate(() => {
      const results = [];
      document.querySelectorAll("div[role='article']").forEach(ad => {
        results.push({
          text: ad.innerText.slice(0, 300)
        });
      });
      return results;
    });

    await browser.close();

    res.json({ keyword, total: ads.length, ads });
  } catch (error) {
    console.error("SCRAPING ERROR:", error);
    res.status(500).json({ error: "Error scraping Ad Library" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Servidor corriendo en http://localhost:" + PORT);
});
