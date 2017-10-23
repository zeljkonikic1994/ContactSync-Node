var express = require('express');
var router = express.Router();
var db = require('../db')

router.get('/', function(req, res, next) {
    res.send('cao')
});
router.post('/', function(req, res, next) {
    var mail = req.body.email;

    var users = db.get().collection('users');
    var contacts = db.get().collection('contacts');
    users.find({'email':mail}).toArray(function (mongoError,resu) {
        if(resu.length) {
            var user = resu[0];
            contacts.find({'user_id':user._id}).toArray(function (mongoError2,result) {
                var odg = {'operation':'contacts_count','count':'','message':''};
                if(result.length){
                    var cont = result;
                    odg.count=cont.length;
                    odg.message='There are unsynchronized contacts.';
                    res.send(odg);
                }else{
                    odg.count=0;
                    odg.message='Server is waiting for your contacts';
                    res.send(odg);
                }
            })
        }
    });
});
module.exports = router;