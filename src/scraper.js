const { chromium } = require("playwright");

async function scrapeAdLibrary(keyword) {
  let browser;

  try {
    browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();

    const url = `https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=US&q=${encodeURIComponent(
      keyword
    )}`;

    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 60000
    });

    // Esperar a que Facebook renderice
    await page.waitForTimeout(8000);

    const ads = await page.evaluate(() => {
      const results = [];
      document.querySelectorAll("div[role='article']").forEach(ad => {
        results.push({
          text: ad.innerText.slice(0, 300)
        });
      });
      return results;
    });

    return ads;

  } catch (error) {
    console.error("ERROR SCRAPING:", error.message);
    throw new Error("Error scraping Ad Library");
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

module.exports = scrapeAdLibrary;
