const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const port = require('./config')[process.env.NODE_ENV].port;
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

// Routing
app.get('/', (req, res) => {
    res.send('Hello, Slck Bot! :-D');
});

http.createServer(app).listen(port, () => {
    console.log('Express App on http port ' + port);
});

module.exports = app;