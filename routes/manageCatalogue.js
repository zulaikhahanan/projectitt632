const express = require('express');
const router = express.Router();
var ObjectId = require('mongodb').ObjectID;

const Prod = require('../models/products');
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

router.get('/projects', ensureAuthenticated, (req, res, next) => {

    Prod.getAll(function(results){
        res.render('myorders', {title: 'Honeycomb - Project Management',
        username: req.user.username,
        profilepic: req.user.profilepic,
        products: results
        });   
    });
})


router.post('/projects', (req, res, next) => {

    itemupload(req, res, () => {
    
        var id = req.body.id;
        var name = req.body.name;
        var description = req.body.description;
        if(req.file != undefined) var picture = req.file.filename;

        // Create 
        if(id == "")
        {
            Prod.create(picture, name, description);
            res.redirect('/projects');
        }
        else if (req.file != undefined) // Update with Picture Change
        {
            const _id = ObjectId(id);
            Prod.update(id, name, description);
            res.redirect('/projects');
        }
        else // Update with no picture change
        {
            const _id = ObjectId(id);
            Prod.updateNoPicture(id, name, description);
            res.redirect('/projects');
        }
    })
    
});

router.post('/deleteProject', (req, res, next) => {
    itemupload(req, res, () => {
        console.log("delete request received")
        var id = req.body.id;
        var _id = ObjectId(id);
        Prod.delete(_id);
        res.sendStatus(204);
    })
});


module.exports = router;