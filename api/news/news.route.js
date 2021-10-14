const express = require('express');
const router = express.Router();
const {getArticles} = require('./news.controller');

router.route('/news').get(getArticles);

module.exports = router;