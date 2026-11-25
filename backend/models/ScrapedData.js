
const mongoose = require('mongoose');

const scrapedDataSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    url: {
        type: String,
        required: true,
        trim: true
    },

    title: {
        type: String,
        trim: true,
        default: 'No title found'
    },

    description: {
        type: String,
        default: 'No description found'
    },

    headings: [{
        type: String
    }],

    paragraphs: [{
        type: String
    }],

    images: [{
        type: String
    }],

    links: [{
        type: String
    }],

    scrapedAt: {
        type: Date,
        default: Date.now
    }

}, { timestamps: true });

module.exports = mongoose.model('ScrapedData', scrapedDataSchema);
