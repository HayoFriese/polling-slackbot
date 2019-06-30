const express = require('express');
const http = require('http');
app = express();
const router = express.Router();
const path = require('path');
const hostname = '127.0.0.1';
const PORT = process.env.PORT || 5000;

// require('../routes');

router.get('/', function(req, res){
	res.sendFile(path.join(__dirname+'/pages/index.html'))
});

app.use('/', router);
app.listen(PORT);
console.log(`listening on port ${PORT}`)
// http.createServer(app).listen(PORT, () => console.log(`Listening on ${hostname}:${ PORT }`));