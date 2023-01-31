'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    picture: {
        type: String,
      
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});


var Prod = mongoose.model('products', schema);

exports.getAll = function(next){
    Prod.find({}, (err, products) => {

        if (err) {
            throw err;
        }

        next(products)
    });
}

exports.create = function(picture, name, description,date){

    let newProduct = new Prod({picture, name, description,date});
    newProduct.save();
}

exports.update = function(id, name, description, picture){
    Prod.updateOne({ "_id" : id }, 
    { "$set" : 
        {   "name" : name, 
            "description" : description,
            "picture": picture,
            
        }
    }).then( x => {console.log("Update Success")});
}

exports.updateNoPicture = function(id, name, description){
    Prod.updateOne({ "_id" : id }, 
    { "$set" : 
        {   "name" : name, 
            "description" : description,
        }
    }).then( x => {console.log("Update Success")});
}

exports.delete = function(id){
    Prod.deleteOne({"_id": id}, function(err, result) {
       if (err) throw err;
    })
    console.log("deleteOne done")
}