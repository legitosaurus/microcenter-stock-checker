'use strict';

const puppeteer = require('puppeteer');

(async() => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Load micro center page
  await page.goto('https://www.microcenter.com/product/511342/dual-geforce-rtx-2080-ti-overclocked-dual-fan-11gb-gddr6-pcie-video-card');

  // Wait for the results page to load and display the results.
  const inventorySelector = '#pnlInventory .inventory .inventoryCnt';
  await page.waitForSelector(inventorySelector);

  const itemNameElement = await page.$('#details h1 span[itemprop="name"] span');
  const inventoryElement = await page.$(inventorySelector);
  const inventoryStatus = await page.evaluate(inventoryElement => inventoryElement.textContent, inventoryElement);
  const itemName = await page.evaluate(itemNameElement => itemNameElement.textContent, itemNameElement);
  console.log('Item Name  : ' + itemName);
  console.log('Item Status: ' + inventoryStatus);
  if (inventoryStatus !== 'Sold Out') {
    console.log('Item is in stock.');
    // Send webook or something
  } else {
    console.log('Item is not stock.');
  }
})();
