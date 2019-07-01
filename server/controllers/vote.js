const express = require('express')
	, router = express.Router();

router.post('/api', function(req, res){
	console.log(req, res);
});

module.exports = router;