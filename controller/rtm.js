const {RTMClient, WebClient} = require('@slack/client');
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
const config = require('../config');
const workspace = require('../config/workspace');

const botApiToken = config.slackApiToken;
const rtm = new RTMClient(botApiToken);
const web = new WebClient(botApiToken);

rtm.on('authenticated', rtmStartData => {
    console.log('Logged in as ' + rtmStartData.self.name + ' of them '
        + rtmStartData.team.name + ', but not yet connected to a channel');
});

rtm.on('message', event => {
    // Skip messages that are from a bot or my own user ID
    if ((event.subtype && event.subtype === 'bot_message') ||
        (!event.subtype && event.user === rtm.activeUserId)) {
        return;
    }

    console.log(`(channel:${event.channel}) ${event.user} said: ${event.text}`);

    const text = event.text;

    const groups = text.match(new RegExp(workspace.triggerName + "야?[^\w\d\s|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*", "gi"));
    // console.log(groups, workspace.triggerName);

    if (!groups || groups.length < 1) {
        return;
    }

    if (groups[0] === text) {
        rtm.sendMessage("네?", event.channel);
        return;
    }

    if (text.includes("안녕")) {
        rtm.sendMessage("안녕하새오! 포메스 애오! 왈왈! 🐶\n아직 조금 모자르지만 차캐오! 앞으로 더 잘할개오! 왈왈!", event.channel);
    } else if (text.includes("천재")) {
        rtm.sendMessage("감사합니다 😃", event.channel);
        web.chat.postMessage({
            channel: event.channel,
            text: '난 원래 천재인데?',
            as_user: false,
            // icon_url=icon_url,
            username: '건방진 속내',
        })
    } else if (text.includes("바보")) {
        rtm.sendMessage("반사🖐", event.channel);
    } else if (text.includes("테스트 입장")) {
        web.users.info({token: botApiToken, user: event.user})
            .then(result => Promise.resolve(result.user))
            .then(user => {
                rtm.sendMessage(user.profile.display_name + workspace.messages.greeting, event.channel);
            });
    }
});

rtm.on('team_join', event => {
    rtm.sendMessage(event.user.profile.display_name + workspace.messages.greeting, workspace.defaultChannel);
});

rtm.on('pin_added', event => {
    web.users.info({token: botApiToken, user: event.user})
        .then(result => Promise.resolve(result.user))
        .then(user => {
            console.log(event.item);
            rtm.sendMessage(user.profile.display_name + '로 부터 *고정메세지* 가 등록되었어요!'
                + '\n모두들 확인해주세요!'
                + '\n```' + event.item.message.text + '\n```', event.channel_id);
        });
});

const listen = (req, res) => {
    let resMessage = workspace.triggerName;

    if (!rtm.connected) {
        rtm.start();
        resMessage += " 출동! 🚨";
    } else {
        resMessage += "는 이미 연결되어있어요! ☺️"
    }

    res.send(resMessage);
};

module.exports = {listen};
