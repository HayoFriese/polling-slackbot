const path = require('path');

router.get('/', function(req, res){
	res.sendFile(path.join(__dirname+'/index.html'))
});