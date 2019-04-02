const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const port = require('./config').port;
const app = express();
const tutorialRouter = require('./router/tutorial');
const homeController = require('./controller/home');
const rtmController = require('./controller/rtm');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

// Routing
app.get('/', homeController.getHomeLogic);
app.get('/rtm', rtmController.listen);

app.use('/tutorial', tutorialRouter);

http.createServer(app).listen(port, () => {
    console.log('Express App on http port ' + port);
});

module.exports = app;
