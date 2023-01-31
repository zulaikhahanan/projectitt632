'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({

    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});


var Project = mongoose.model('projects', schema);

exports.getAll = function(next){
    Project.find({}, (err, projects) => {

        if (err) {
            throw err;
        }

        next(projects)
    });
}

exports.create = function(date, title, description){

    let newProject = new Prod({picture, title, description});
    newProject.save();
}

exports.update = function(id, title, description, date){
    Project.updateOne({ "_id" : id }, 
    { "$set" : 
        {   "title" : title, 
            "description" : description,
            "date": date
        }
    }).then( x => {console.log("Update Success")});
}



exports.delete = function(id){
    Project.deleteOne({"_id": id}, function(err, result) {
       if (err) throw err;
    })
    console.log("deleteOne done")
}