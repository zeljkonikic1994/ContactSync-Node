var express = require('express');
var router = express.Router();
var db = require('../db')

router.get('/', function(req, res, next) {
    res.send('cao')
});
router.post('/', function(req, res, next) {
    var idArray = req.body.ids;
    // console.log(idArray);
    var email = req.body.email;
    var requiredIDs = idArray.slice();
    var pullIDs = [];
    // console.log(idArray);

    var users = db.get().collection('users');
    var collection = db.get().collection('contacts');
    users.find({'email':email}).toArray(function(err,resul){
        if(err){
            console.log('Unable to connect to the server', err);
            res.send(err);
        }else if(resul.length){
            var user = resul[0];
            collection.find({'user_id': user._id}).toArray(function (err, result) {
                if (err) {
                    console.log('Unable to connect to the server', err);
                    res.send(err);
                } else if (result.length) {
                    var contactsArray = result;
                    contactsArray.forEach(function(value){
                        var indicator = idArray.indexOf(value.contact_id);
                        if(indicator==-1){
                            pullIDs.push(value.contact_id);
                        }else{
                            var ind = requiredIDs.indexOf(value.contact_id);
                            requiredIDs.splice(ind,1);
                        }
                    });
                    var odg = {'operation':'push_needed','data':requiredIDs,'message':'','pull_needed':false,'pull_count':''};

                    if(pullIDs.length>0){
                        odg.pull_needed=true;
                        odg.pull_count=pullIDs.length;
                    }
                    if(requiredIDs.length==0){
                        odg.operation = 'no_push_needed';
                        odg.message = 'Your contacts are up to date!';
                        console.log(odg);
                        res.send(odg);
                    }else{
                        console.log(odg);
                        odg.message='You have '+requiredIDs.length+' contacts to send.';
                        res.send(odg);
                    }
                }else{
                    res.send('no contacts');
                }
            });
        }else{
            res.send('no user');
        }});
});
module.exports = router;