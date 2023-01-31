const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const schema = new mongoose.Schema({
    profilepic: {
        type: String,
        required: true,
        default: "defaultdp.png"
    },
    email: {
        type: String,
        required: true
    },
    pw1: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    
    picture: {
        type: String

    },
   
    ifAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
});

var Acct = mongoose.model('accounts', schema);

exports.ifExists = function(email){
    Acct.findOne({ email: email})
    .then( exists => {
        if(exists)
            return true;
        else
            return false;
    })
}

exports.create = function(username,  email,  pw1, pw2, ifAdmin)
{
    const newUser = new Acct({
        username,
        email,
        pw1,
        ifAdmin
    });

    bcrypt.genSalt(10, (err, salt) => 
        bcrypt.hash(newUser.pw1, salt, (err, hash) => {
            if(err) throw err;
            // Hashed password
            newUser.pw1 = hash;
            newUser.save()
            .catch(err => console.log(err));
        }))
}

exports.getById = function(id, next){
    Acct.findOne({"_id":id}, (err, results) => {
        if (err) throw err;
        next(results);
    })
}

exports.passport = function(email){

    return Acct.findOne({ email }, (err, results) => {
        if (err) throw err;
    })
}

exports.passportId = function(id, doneParam){

    Acct.findById(id, function(err, user) {
        doneParam(err, user);
    });
}

exports.update = function(id, username){

    Acct.updateOne({ "_id" : id }, 
    { "$set" : 
      {"username" : username
      }
    }).then( x => {console.log("Update Success")});
}

exports.updatePicture = function(id, picture){
    Acct.updateOne({ "_id" : id }, 
    { "$set" : 
      {"profilepic": picture}
    }).then( x => {console.log("Update Success")});
}

exports.updatePassword = function(id, hash){
    Acct.updateOne({ "_id" : id }, 
    { "$set" : 
      {
        "pw1": hash
      }
    }).then( x => {console.log("Update Success")});
}
