
const ScrapedData = require('../models/ScrapedData');
const scrapeWebsite = require('../services/scraperService');

// 1. Scrape website and save data
const scrapeAndSave = async (req, res) => {
    try {
        const { url } = req.body;

        if (!url) {
            return res.status(400).json({
                success: false,
                message: "Website URL is required"
            });
        }

        // Extract information using scraper service
        const scrapedInfo = await scrapeWebsite(url);

        // Save extracted information in MongoDB
        const savedData = await ScrapedData.create({
            userId: req.user.id,
            url,
            ...scrapedInfo
        });

        res.status(201).json({
            success: true,
            message: "Website scraped successfully",
            data: savedData
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// 2. Get all scraped records of logged-in user
const getScrapedData = async (req, res) => {
    try {
        const data = await ScrapedData.find({
            userId: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: data.length,
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// 3. Get one scraped record
const getScrapedById = async (req, res) => {
    try {
        const data = await ScrapedData.findOne({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!data) {
            return res.status(404).json({
                success: false,
                message: "Scraped record not found"
            });
        }

        res.status(200).json({
            success: true,
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// 4. Delete scraped record
const deleteScrapedData = async (req, res) => {
    try {
        const deletedData = await ScrapedData.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!deletedData) {
            return res.status(404).json({
                success: false,
                message: "Scraped record not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Scraped record deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    scrapeAndSave,
    getScrapedData,
    getScrapedById,
    deleteScrapedData
};
