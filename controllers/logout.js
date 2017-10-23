var express = require('express');
var router = express.Router();
var db = require('../db')
var passwordHash = require('password-hash');

router.get('/', function(req, res, next) {
    res.send('cao')
});
router.post('/', function(req, res, next) {
    var email = req.body.email;
    // var password = req.body.password;

    var collection = db.get().collection('users');

    collection.find({'email':email}).toArray(function(err,result){
        if(err){
            console.log('Unable to connect to the server', err);
        }else if(result.length){
            var user = result[0];
            // if(passwordHash.verify(password, user.password)){
            //     res.send(user);
            // }else{
            //     res.send('Wrong password!')
            // }

            // if(user.status=="logged in") {
            //     user.status="logged out";
            //     collection.updateOne({"email":email},{$set:user},function(err,result){
            //         // assert.equal(null,err);
            //         console.log('uspesno promenio status');
            //     });
            //     res.send('successfull_logout');
            // }else{
            //     res.send('error!!!');
            // }
            res.send('successfull_logout');
        }else{
            res.send('no such user');
        }
    });
});
module.exports = router;