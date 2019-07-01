const path = require('path');
const express = require('express')
	, router = express.Router();

router.use('/api/vote', function(req, res){
	console.log(req, res);
});

module.exports = router;