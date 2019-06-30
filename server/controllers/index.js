// module.exports = {
//     "index": router.get('/', function(req, res){ res.sendFile(path.join(__dirname+'/pages/index.html')); }),
// }

// class Routes {
//     constructor(router) {
//         this.router = router;
//     }

//     _getIndex() {
//         router.get('/', function(req, res){
//             res.sendFile(path.join(__dirname+'/pages/index.html'));
//         });
//     }
// };

const path = require('path');
const express = require('express')
    , router = express.Router()

    router.get('/', function(req, res){
        const dirname = __dirname.replace('/controllers', '');
        res.sendFile(path.join(dirname+'/views/index.html'));
    });

module.exports = router;