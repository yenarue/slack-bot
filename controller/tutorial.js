const {WebClient} = require('@slack/web-api');
const config = require('../config');
const workspace = require('../config/workspace');

const botApiToken = config.slackApiToken;
const web = new WebClient(botApiToken);

const getCurrentTime = (req, res) => {
    const currentTime = new Date().toTimeString();

    web.chat.postMessage({
        channel: req.channelMap[workspace.defaultChannel],
        text: '안녕하새오. 시계애오. \n 현재시각은 *' + currentTime + '* 이애오. 감사해오.',
        as_user: false,
        username: '시간알리미',
    });

    res.sendStatus(200);
};

const findMessageInChannel = (req, res) => {
    const msg = req.query.msg;
    const channel = req.query.channel;
    const incomingwebhook = new IncomingWebhook(process.env.TEST_SLACK_WEBHOOK_URL);
    const webClient = new WebClient(process.env.TEST_SLACK_TOKEN);

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