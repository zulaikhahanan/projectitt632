const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const mongoose = require("mongoose");
const moment = require('moment');

const ObjectID = require('mongodb').ObjectID;
const Acct = require('../models/accounts')


router.get('/catalogue', ensureAuthenticated, (req,res) => {
    
    const _id = ObjectID(req.session.passport.user);
    
    Acct.getById(_id, function(results){
 
                    res.render('catalogue', 
                    {
                        title: 'Honeycomb-Index',
                        username: results.username,
                        profilepic: results.profilepic,
                    })
                
            
        
    })
})

module.exports = router;
