const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');

const app = express();

// app.use(express.json());
app.use(express.static('public'));
// Create route
app.get('/api/data', (req, res) => {
    const results = [];
    const uri = './api/data/';
    const fileName = 'remote_Jobs_list.csv';
    fs.createReadStream(uri + fileName)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => res.json(results));
});

// app.get('/', (req, res) => {
//     res.send('Api is runinng.../api/data');
// })

// Define the homepage route
app.get('/', (req, res) => {
    // Render the homepage template with the link and PayPal button
    res.render('home', {
        portfolioLink: 'https://theglitch1.github.io',
        paypalButton: 'https://www.paypal.com/donate/buttons',
        paypalMeLink: 'https://paypal.me/lievyasin',
    });
});

// passing the port if env variable is set up or default 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});