const express = require('express');
const http = require('http');
app = express();
const path = require('path');
const hostname = '127.0.0.1';
const PORT = process.env.PORT || 5000;

app.set('views', './views');

app.use(require('./controllers'));
app.listen(PORT);
console.log(`listening on port ${PORT}`);
// http.createServer(app).listen(PORT, () => console.log(`Listening on ${hostname}:${ PORT }`));