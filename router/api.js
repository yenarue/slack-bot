const express = require('express');
const router = express.Router();
const controller = require('../controller/api');

router.route('/channels').get(controller.getChannels);

module.exports = router;