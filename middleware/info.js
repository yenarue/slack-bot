const {WebClient} = require('@slack/client');
const config = require('../config/index');

const botApiToken = config.slackApiToken;
const web = new WebClient(botApiToken);

const channelsSetter = (req, res, next) => {
    web.conversations.list({token: botApiToken})
        .then(result => {
            req.channelMap = {};
            result.channels.forEach(item => {
                req.channelMap[item.name] = item.id;
            });
            next();
        }).catch(err => {
            console.error(err);
            res.send(err);
        });
};

module.exports = {channelsSetter};