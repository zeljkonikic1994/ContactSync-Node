var express = require('express');
var router = express.Router();
var db = require('../db')
var passwordHash = require('password-hash');

router.get('/', function(req, res, next) {
    res.send('cao')
});

router.post('/', function(req, res, next) {
    console.log(req.body);
    var email = req.body.email;
    var password = req.body.password;

    var collection = db.get().collection('users');
    collection.find({'email':email}).toArray(function (err, result) {
        if(err){
            console.log('Unable to connect to the server', err);
            res.send('Server error!')
        }else if(result.length){
            var user = result[0];
            if(passwordHash.verify(password, user.password)){
                user.password = password;
                res.send(user);
            }else{
                res.send('Wrong password!')
            }
        }else{
            res.send('No such user');
        }
    });
});
module.exports = router;