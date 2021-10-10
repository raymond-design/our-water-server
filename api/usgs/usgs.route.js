const express = require('express')
const router = express.Router()
const {site, county, huc} = require('./usgs.controller.js');

router.route('/site').get(site);
router.route('/county').get(county);
router.route('/huc').get(huc);

module.exports = router;

