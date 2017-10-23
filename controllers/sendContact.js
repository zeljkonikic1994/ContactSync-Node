var express = require('express');
var router = express.Router();
var db = require('../db')
var Contact = require('../Contact.js')

router.get('/', function(req, res, next) {
    res.send('cao')
});
router.post('/', function(req, res, next) {
    var contactsArray = req.body;
    console.log(contactsArray.length);
    var users = db.get().collection('users');
    var contacts = db.get().collection('contacts');
    users.find({'email':contactsArray[0].email}).toArray(function (mongoError,result) {
        if(mongoError){
            console.log(mongoError)
        }
        if(result.length){
            var saved=null;
            contactsArray.forEach(function(value){
                var cont = new Contact(result[0],value.contact_id,value.name,value.phoneNumber);
                saved = contacts.insertOne(cont);
            });
            res.send(saved.contact_id)
        }else {
            console.log('result je null')

            res.send('error, no such contact');
        }
    })
});
module.exports = router;