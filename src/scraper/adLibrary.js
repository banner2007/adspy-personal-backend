const { chromium } = require("playwright");

async function scrapeAdLibrary(keyword) {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();

  const url = `https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=ALL&q=${encodeURIComponent(
    keyword
  )}`;

  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(5000);

  const ads = await page.evaluate(() => {
    const results = [];
    const cards = document.querySelectorAll('[role="article"]');

    cards.forEach(card => {
      results.push({
        text: card.innerText.slice(0, 500)
      });
    });

    return results;
  });

  await browser.close();
  return ads;
}

module.exports = scrapeAdLibrary;
