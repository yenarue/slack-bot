const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const port = require('./config').port;
const app = express();
const tutorialRouter = require('./router/tutorial');
const apiRouter = require('./router/api');
const homeController = require('./controller/home');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

// Routing
app.get('/', homeController.getHomeLogic);

app.use('/tutorial', tutorialRouter);
app.use('/api', apiRouter);

http.createServer(app).listen(port, () => {
    console.log('Express App on http port ' + port);
});

module.exports = app;