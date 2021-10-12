const PORT = 8000;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();


const url = 'https://www.dev.to';

axios(url)
    .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        const articles = [];
        let storyNumber = 0;
        $('.crayons-story__title', html).each(function() {
            ++storyNumber;
            const title = $(this).text().trim();
            const url = $(this).find('a').attr('href');
            articles.push({
                title,
                url,
                storyNumber
            })
        })
        console.log(articles);
    }).catch(err => console.log(err));

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));