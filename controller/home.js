const {RTMClient, WebClient} = require('@slack/client');
const CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
const RTM_EVENTS = require('@slack/client').RTM_EVENTS;
const config = require('../config');

const botApiToken = config.slackApiToken;
const rtm = new RTMClient(botApiToken);
const web = new WebClient(botApiToken);

const getHomeLogic = (req, res) => {
    // console.log('Getting started with Slack Developer Kit for Node.js');
    // res.send('Getting started with Slack Developer Kit for Node.js');
    //
    // const timeNotification = new IncomingWebhook(process.env.TEST_SLACK_WEBHOOK_URL);
    // const currentTime = new Date().toTimeString();
    // timeNotification.send('현재시각 : ' + currentTime).then(res => {
    //     console.log("Notification sent");
    // }).catch(err => {
    //     console.error(err);
    // });
    rtm.on('authenticated', rtmStartData => {
        console.log('Logged in as ' + rtmStartData.self.name + ' of them '
            + rtmStartData.team.name + ', but not yet connected to a channel');
    });

    rtm.on('message', message => {
        // Skip messages that are from a bot or my own user ID
        if ((message.subtype && message.subtype === 'bot_message') ||
            (!message.subtype && message.user === rtm.activeUserId)) {
            return;
        }

        console.log(`(channel:${message.channel}) ${message.user} says: ${message.text}`);

        const text = message.text;

        if (text.includes("천재")) {
            rtm.sendMessage("감사", message.channel);
            web.chat.postMessage({
                channel: message.channel,
                text: '난 원래 천재인데?',
                as_user: false,
                // icon_url=icon_url,
                username: '건방진 속내',
            })
        } else if (text.includes("바보")) {
            rtm.sendMessage("반사", message.channel);
        } else if (text.includes("포메이커스 입장")) {
            web.users.info({token: botApiToken, user: message.user})
                .then(result => Promise.resolve(result.user))
                .then(user => {
                    const chat = user.profile.display_name + "님 어서오세요!\n"
                        + "저는 포메이커스 팀의 마스코트 *포메* 라고 해요.\n"
                        + "저희 채널을 안내해 드릴게요!\n"
                        + "- #general : 일상적으로 사용하는 대화방이에요. 잡담을 나눠보아요!\n"
                        + "- #dev : 개발팀이 대화하는 곳이에요.\n"
                        + "- #dev-build : 개발팀의 커밋 및 빌드 현황판 전용 채널이에요.\n"
                        + "- #informations : 유용한 정보, 기사 등 다양한 정보를 공유하는 채널이에요.\n"
                        + "- #calendar : 포메이커스의 일정 알림방 이에요. 구글 캘린더와 연동되어있어요.\n"
                        + "이 외에도 더 많은 채널들이 있어요. 채널 목록을 참조해주세요!";

                    rtm.sendMessage(chat, global.channels.bots);
                });
        }
    });

    rtm.on('team_join', event => {
        const chat = event.user.profile.display_name + "님 어서오세요!\n"
            + "저는 아직 테스트 중인 *예나가 테스트하는 봇* 라고 해요.\n"
            + "여기는 예나르의 개인 개발용 슬랙 이에요!"
            + "저희 채널을 안내해 드릴게요!\n"
            + "- #general : 일상적으로 사용하는 대화방이에요. 잡담을 나눠보아요!\n"
            + "- #bots : 저를 테스트하는 곳이에요.\n"
            + "- #build-statusboard : 개발팀의 커밋 및 빌드 현황판 전용 채널이에요.\n"
            + "- #random : 아무말 대잔치\n"
            + "이 외에도 더 많은 채널들이 있어요. 채널 목록을 참조해주세요!";

        rtm.sendMessage(chat, global.channels.general);
    });

    rtm.start();
};

module.exports = {getHomeLogic};