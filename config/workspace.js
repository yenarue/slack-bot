const config = require('./index');

const workspace = {
    yeanrueDev: {
        defaultChannel: 'bots',
        triggerName: '예나르봇',
        messages: {
            greeting: "님 어서오세요!\n"
            + "저는 아직 테스트 중인 *예나가 테스트하는 봇* 라고 해요.\n"
            + "여기는 예나르의 개인 개발용 슬랙 이에요!"
            + "저희 채널을 안내해 드릴게요!\n"
            + "- #general : 일상적으로 사용하는 대화방이에요. 잡담을 나눠보아요!\n"
            + "- #bots : 저를 테스트하는 곳이에요.\n"
            + "- #build-statusboard : 개발팀의 커밋 및 빌드 현황판 전용 채널이에요.\n"
            + "- #random : 아무말 대잔치\n"
            + "이 외에도 더 많은 채널들이 있어요. 채널 목록을 참조해주세요!",
        },
    },
    forMakers: {
        defaultChannel: '_general',
        greetingChannel: 'C67GYHR5Y',
        triggerName: '포메스',
        messages: {
            greeting: "님 어서오세요! 😍\n"
            + "저는 포메이커스 팀의 마스코트 *포메스* 라고 해요.\n"
            + "저희 채널을 안내해 드릴게요!\n"
            + "- #_general : 일상적으로 사용하는 대화방이에요. 잡담을 나눠보아요!\n"
            + "- #_welcome : 자기소개 및 환영인사를 전하는 대화방이에요!\n"
            + "- #calendar : 포메이커스의 일정 알림방 이에요. 구글 캘린더와 연동되어있어요.\n"
            + "- #design : 디자인팀이 대화하는 곳이에요.\n"
            + "- #dev : 개발팀이 대화하는 곳이에요.\n"
            + "- #dev-build : 개발팀의 커밋 및 빌드 현황판 전용 채널이에요.\n"
            + "- #informations : 유용한 정보, 기사 등 업무에 관련된 다양한 정보를 공유하는 채널이에요.\n"
            + "이 외에도 더 많은 채널들이 있어요. 채널 목록을 참조해주세요!",
            welcome: ":tada: 포메이커스 슬랙에 오신 것을 환영합니다!!! :tada:\n\n" +
                "< 다짜고짜 포메이커스 자기소개 템플릿 >\n" +
                ":blush: 이름은 무엇인가요?\n" +
                ":heart_eyes: 회사에서 사용할 닉네임이 궁금해요!\n" +
                ":relaxed: 어렸을적 꿈은 무엇이었어요?\n" +
                ":kissing: 지금까지 무슨일을 하셨었나요?\n" +
                ":hugging_face: 포메이커스에서 가장 기대되는 것은 무엇인가요?\n" +
                ":wink: 포메이커스에서 가장 얻고싶은 것은 무엇인가요?\n" +
                ":star-struck: 혹시 어떤 음식 좋아하세요?\n" +
                ":smile: 쉬는 날엔 무엇을 하시나요?\n" +
                ":blush: 당신에게 가장 소중한 사람or생명체or사물은 무엇인가요?\n" +
                ":thinking_face: 복권에 당첨된다면 무엇을 하실건가요?\n" +
                ":heart: 포메이커스 팀이 환영하는거 알고 계시죠?\n" +
                ":microphone: 포메이커스 팀에게 한마디!\n\n" +
                "<!everyone> 모두들 새로 오신 분을 위해 환영 메세지를 남겨보세요!",
        },
    },
    funStudy: {
        defaultChannel: 'general',
        triggerName: '열공봇',
        messages: {
            greeting: "님 어서오세요!\n"
            + "저는 FunStudy 슬랙방의 마스코트 *열공봇* 이라고 해요.\n"
            + "저희 채널을 안내해 드릴게요!\n"
            + "- #general : 일상적으로 사용하는 대화방이에요. 잡담을 나눠보아요!\n"
            + "- #dev : 개발 관련 대화방이에요. 좋은 개발 포스팅이나 컨퍼런스 정보를 공유하고 모르는 건 서로 물어보고 공유합시다요! \n"
            + "- #dev-slack : 제가 개발되고 있는 연구실이에요.\n"
            + "- #english : 영어로만 대화하는 영어방이에요. 영어라 그런지 뭔가 대화가 뜸한건 기분 탓 일 거에요.\n"
            + "- #certificate : 자격증 관련 방이에요. 사실 AWS 방에 가까워요.\n"
            + "- #thanks-diary : 감사일기을 쓰는 방이에요. 어느순간부터 정전이 되었어요.\n"
            + "- #일일커밋 : 커밋 알림 방이에요. github 봇을 연결해뒀어요. 자신의 깃허브 계정을 연결해서 일일커밋 알람을 받아보세요!\n"
            + "- #52주적금 : 52주 적금을 실천하는 방이에요. 사실 금융방에 가까워요.\n"
            + "이 외에도 더 많은 채널들이 있어요. 채널 목록을 참조해주세요!",
        }
    }
};

module.exports = workspace[config.workspace];
