const express = require('express');
const http = require('http');
const request = require('request');
app = express();
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const hostname = '127.0.0.1';
const PORT = process.env.PORT || 5000;

app.set('views', './views');

app.post('/api', urlEncodedParser, (req, res) => {
	console.log(req, res);
});

app.use(require('./controllers'));

http.createServer(app).listen(PORT, () => console.log(`Listening on ${hostname}:${ PORT }`));