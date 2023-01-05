express = require('express');
router = express.Router()

router.get('/drum',function(req,res){
    res.sendFile(__dirname + '/Drums/808/hihat.ogg');
})

module.exports = router
