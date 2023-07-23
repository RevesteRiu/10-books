const puppeteer = require("puppeteer");

async function scrapeProduct(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const txtElement = await page.$("h1");

  if (txtElement) {
    const txtProperty = await txtElement.getProperty("textContent");
    const txtContent = await txtProperty.jsonValue();
    browser.close();

    return txtContent.trim();
  } else {
    console.log("Элемент не найден.");
    browser.close();
    return null;
  }
}

async function runMultipleTimes() {
  const results = [];

  for (let i = 0; i < 10; i++) {
    const url = "https://kniga.lv/?random=1";
    const result = await scrapeProduct(url);
    results.push(result);
  }

  results.sort();

  console.log(results);
}

runMultipleTimes();
