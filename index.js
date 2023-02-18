const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');

const app = express();

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


// passing the port if env variable is set up or default 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});