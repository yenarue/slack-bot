const {IncomingWebhook, WebClient} = require('@slack/client');

const getCurrentTime = (req, res) => {
    console.log('Getting started with Slack Developer Kit for Node.js');
    res.send('Getting started with Slack Developer Kit for Node.js');

    const timeNotification = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);
    const currentTime = new Date().toTimeString();
    timeNotification.send('현재시각 : ' + currentTime).then(res => {
        console.log("Notification sent");
    }).catch(err => {
        console.error(err);
    });
};

module.exports = {getCurrentTime};