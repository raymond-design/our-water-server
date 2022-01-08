const express = require('express');
const env_vars = require('../../config.js');
const cors = require('cors');

const app = express();
const port = env_vars.port || 3001;

const usgs = require('../../api/usgs/usgs.route.js');
const mapbox = require('../../api/mapbox/mapbox.route.js');
const news = require('../../api/news/news.route.js');

app.use(cors());

app.use('/api/usgs', usgs);
//app.use('/api/mapbox', mapbox): -not implemented yet
app.use('/api/news', news);

app.use("*", (req, res) => res.status(404).json({ error: "invalid api request" }));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});