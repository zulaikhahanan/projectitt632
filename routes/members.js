const express = require('express');
const router = express.Router();
var ObjectId = require('mongodb').ObjectID;

const Member = require('../models/members');
const { ensureAuthenticated } = require('../config/auth');

const multer = require('multer');

const itemstrategy = multer.diskStorage({
    destination: function (req, file, cb)
    {
        cb(null, './assets/itempictures/')
    },
    filename: function (req, file, cb)
    {
        cb(null, file.originalname)
    }
});

const imgfilter = function (req, file, cb)
{
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') cb (null, true);
    else cb (null, false);
}

const itemupload = multer({storage: itemstrategy, fileFilter: imgfilter}).single('itemImg');

router.get('/members', ensureAuthenticated, (req, res, next) => {

    Member.getAll(function(results){
        res.render('teammembers', {title: 'Honeycomb - Team Member',
        username: req.user.username,
        profilepic: req.user.profilepic,
        members: results
        });   
    });
})

router.post('/members', (req, res, next) => {

    itemupload(req, res, () => {
    
        var id = req.body.id;
        var name = req.body.name;
        var role = req.body.role;
        if(req.file != undefined) var picture = req.file.filename;

        // Create 
        if(id == "")
        {
            Member.create(picture, name, role);
            res.redirect('/members');
        }
        else if (req.file != undefined) // Update with Picture Change
        {
            const _id = ObjectId(id);
            Member.update(id, name, role);
            res.redirect('/members');
        }
        else // Update with no picture change
        {
            const _id = ObjectId(id);
            Member.updateNoPicture(id, name, role);
            res.redirect('/members');
        }
    })
    
});

router.post('/deleteMember', (req, res, next) => {
    itemupload(req, res, () => {
        console.log("delete request received")
        var id = req.body.id;
        var _id = ObjectId(id);
        Member.delete(_id);
        res.sendStatus(204);
    })
});


module.exports = router;

