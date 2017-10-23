var express = require('express');
var router = express.Router();
var db = require('../db')
var User = require('../User.js')
var passwordHash = require('password-hash');

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log(req.body);
    res.send("Proba");
});

router.post('/', function (req,res,next) {
    console.log(req.body);
    var ime = req.body.name;
    var prezime = req.body.lastname;
    var email = req.body.email;
    var password = req.body.password;

    var hashedPassword = passwordHash.generate(password);
    var u = new User(ime, prezime, email, hashedPassword);

    console.log(hashedPassword);
    var collection = db.get().collection('users');

        collection.find({'email':email}).toArray(function(err,result){
            if(err){
                console.log('Unable to connect to the server', err);
                res.send('unsuccessfull');
            }else if(result.length){
                res.send('unsuccessfull');
            }else{
                collection.insertOne(u,function(err,result){
                    if(err){
                        console.log(err);
                    }else{
                        res.send('successful_register');
                    }
                });
            }
        });
});
module.exports = router;
