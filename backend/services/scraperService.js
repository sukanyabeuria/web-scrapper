
const axios = require('axios');
const cheerio = require('cheerio');

const scrapeWebsite = async (url) => {

    // 1. Fetch website HTML
    const response = await axios.get(url, {
        timeout: 10000,
        maxContentLength: 5 * 1024 * 1024,
        maxBodyLength: 5 * 1024 * 1024,
        headers: {
            'User-Agent': 'WebScraper/1.0'
        }
    });

    // 2. Load HTML using Cheerio
    const $ = cheerio.load(response.data);

    // 3. Extract website title
    const title = $('title').first().text().trim()
        || 'No title found';

    // 4. Extract description
    const description =
        $('meta[name="description"]').attr('content')
        || 'No description found';

    // 5. Extract headings
    const headings = $('h1, h2, h3')
        .map((i, el) => $(el).text().trim())
        .get()
        .filter(Boolean)
        .slice(0, 100);

    // 6. Extract paragraphs
    const paragraphs = $('p')
        .map((i, el) => $(el).text().trim())
        .get()
        .filter(Boolean)
        .slice(0, 100);

    // 7. Extract images
    const images = $('img')
        .map((i, el) => {
            const src = $(el).attr('src');
            return src ? new URL(src, url).href : null;
        })
        .get()
        .filter(Boolean)
        .slice(0, 50);

    // 8. Extract links
    const links = $('a')
        .map((i, el) => {
            const href = $(el).attr('href');
            return href ? new URL(href, url).href : null;
        })
        .get()
        .filter(Boolean)
        .slice(0, 100);

    // 9. Return extracted information
    return {
        title,
        description,
        headings,
        paragraphs,
        images,
        links
    };
};

module.exports = scrapeWebsite;
