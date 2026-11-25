const express = require("express");
const router = express.Router();
const {scrapeAndSave, getScrapedData, getScrapedById, deleteScrapedData} = require("../controllers/scraperController");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/scrape",scrapeAndSave);
router.get("/scraped-data",authMiddleware,getScrapedData);
router.get("/scraped-data/:id",authMiddleware,getScrapedById);
router.delete("/scraped-data/:id",authMiddleware,deleteScrapedData);

module.exports = router;