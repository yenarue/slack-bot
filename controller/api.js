const {RTMClient, WebClient} = require('@slack/client');
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
const config = require('../config');

const botApiToken = config.slackApiToken;
const rtm = new RTMClient(botApiToken);
const web = new WebClient(botApiToken);

const getChannels = (req, res) => {
    web.conversations.list({token: botApiToken})
        .then(result => {
            const channels = {};
            result.channels.forEach(item => {
                channels[item.name] = item.id;
            });
            global.channels = channels;
            res.send(global.channels);
        })
};

module.exports = {getChannels};