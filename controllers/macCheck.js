var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('../db')
/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log(req.body);
});
router.post('/', function (req,resp,next) {
    // console.log(req);
    var macAdress = req.body.mac;
    var mail = req.body.email;
    var collection = db.get().collection('users');
    var contacts = db.get().collection('contacts');
    var response = {'operation':'','message':''};
    collection.find({'email':mail}).toArray(function (err,res) {
        if(err){
            console.log('Greska',err);
        }else if(res.length){
            var user = res[0];
            var addressess=user.devices;
            var contains = false;
            for (var i = 0; i < addressess.length; i++) {
                if (addressess[i] == macAdress) {
                    contains = true;
                }
            }
            if(contains){
                response.operation='old_device'
                // response.operation='new_device'

                response.message='Welcome back '+res[0].name;
            }else{
                response.operation='new_device'
                response.message='Welcome!'
                user.devices.push(macAdress)
                var saved = collection.updateOne({'email':user.email},user)
            }
            resp.send(response);
        }else{
            response.operation='error'
            resp.send(response);
        }

    })
});
module.exports = router;
