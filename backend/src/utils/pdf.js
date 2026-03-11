import puppeteer from "puppeteer";
import logger from "../config/logger.js";

export const generatePDF = async (content) => {
  console.log("HTML_CONTENT", content);
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  } catch (e) {
    logger.info("Could not create a browswer instance", e);
  }
  const page = await browser.newPage();
  await page.setContent(content, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    margin: {
      top: "20mm",
      bottom: "20mm",
      left: "15mm",
      right: "15mm",
    },
  });

  await browser.close();

  return pdfBuffer;
};
