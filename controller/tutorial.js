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

const findMessageInChannel = (req, res) => {
    const msg = req.query.msg;
    const channel = req.query.channel;
    const incomingwebhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);
    const webClient = new WebClient(process.env.SLACK_TOKEN);

    console.log('Calling search.messages');
    webClient.search.messages({query: msg, sort: 'timestamp'})
        .then(result => result.messages.matches.filter(item => item.channel.name === channel))
        .then(findMessagesInChannel => {
            if (findMessagesInChannel.length > 0) {
                console.log(findMessagesInChannel);

                let message = channel + '채널에서 *\'' + msg +'\'* 메세지를 ' + findMessagesInChannel.length + '개 찾았습니다'
                    + findMessagesInChannel.map(item => '\n[' + new Date(Number(item.ts)) +'] ' +item.username + ' : ' + item.text);

                res.send(message);
                return incomingwebhook.send(message);
            } else {
                console.log('No matches found');
            }
        })
        .then(res => console.log('Message sent'))
        .catch(console.error);
};

module.exports = {getCurrentTime, findMessageInChannel};