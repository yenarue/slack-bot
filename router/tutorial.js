const express = require('express');
const router = express.Router();
const controller = require('../controller/tutorial');

router.route('/time').get(controller.getCurrentTime);
    // .post(controller.postUserApps);

router.route('/find').get(controller.findMessageInChannel);

module.exports = router;