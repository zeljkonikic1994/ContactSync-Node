var express = require('express');
var router = express.Router();
var db = require('../db')

router.get('/', function (req, res, next) {
    res.send('cao')
});

router.post('/', function (req, res, next) {
    var id = req.body.lastId;
    var email = req.body.email;
    var collection = db.get().collection('contacts');
    var users = db.get().collection('users');
    //
    // var oldNewArray = req.body.oldNew;
    // var id = -1;
    // oldNewArray.forEach(function (value) {
    //     id = value.old;
    // })
    // console.log(id);

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
                    var contacts = result;
                    var contact = null;

                    if (id == -1) {
                        // console.log('poslato od 0 do 49')
                        res.send(contacts.slice(0, 50));
                    } else {
                        contacts.forEach(function(value){
                            if(value.contact_id==id){
                                contact = value;
                            }
                            // oldNewArray.forEach(function(val){
                            //     if(val.old == value.contact_id){
                            //         var upd = JSON.parse(JSON.stringify(value));
                            //         upd.contact_id=val.new;
                            //         var saved = collection.updateOne({'_id':upd._id},upd);
                            //     }
                            // });
                        });

                        if(contact!=null){
                            var index = contacts.indexOf(contact)+1;
                            if (index == contacts.length - 1) {
                                res.send('end');
                                // console.log('poslato od '+index+' do kraja')
                            } else {
                                res.send(contacts.slice(index, index + 50));
                                // var ind = index+50;
                                // console.log('poslato od '+index+' do '+ ind)
                            }
                        }else{
                            res.send('no contact with that id');
                        }
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