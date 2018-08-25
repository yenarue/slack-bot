const express = require('express');
const router = express.Router();
const controller = require('../controller/tutorial');
const Info = require('../middleware/info');

router.route('/time').get(Info.channelsSetter, controller.getCurrentTime);
    // .post(controller.postUserApps);

router.route('/find').get(Info.channelsSetter, controller.findMessageInChannel);

module.exports = router;