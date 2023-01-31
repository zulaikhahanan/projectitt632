'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    picture: {
        type: String,
      
    },
   
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});


var Member = mongoose.model('members', schema);

exports.getAll = function(next){
    Member.find({}, (err, members) => {

        if (err) {
            throw err;
        }

        next(members)
    });
}

exports.create = function(picture, name, role){

    let newMember = new Member({picture, name, role});
    newMember.save();
}

exports.update = function(id, name, role, picture){
    Member.updateOne({ "_id" : id }, 
    { "$set" : 
        {   "name" : name, 
            "role" : role,
            "picture": picture,
            
        }
    }).then( x => {console.log("Update Success")});
}

exports.updateNoPicture = function(id, name, role){
    Member.updateOne({ "_id" : id }, 
    { "$set" : 
        {   "name" : name, 
            "role" : role,
        }
    }).then( x => {console.log("Update Success")});
}

exports.delete = function(id){
    Member.deleteOne({"_id": id}, function(err, result) {
       if (err) throw err;
    })
    console.log("DeleteOne Done")
}