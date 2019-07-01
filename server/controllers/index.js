const path = require('path');
const express = require('express')
    , router = express.Router()

    router.use('/api/vote', require('./vote'));

    router.get('/', function(req, res){
        const dirname = __dirname.replace('/controllers', '');
        res.sendFile(path.join(dirname+'/views/index.html'));
    });

module.exports = router;