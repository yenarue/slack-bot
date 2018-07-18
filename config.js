const config = {
    development : {
        port: process.env.PORT || 8080,
        slackApiToken: process.env.SLACK_API_TOKEN,
    },
    test : {
        port: 3000,
    }
};

module.exports = config[process.env.NODE_ENV];