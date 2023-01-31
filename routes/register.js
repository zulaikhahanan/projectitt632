const express = require('express');
const router = express.Router();
const { forwardAuthenticated } = require('../config/auth');

const Acct = require('../models/accounts')

router.get('/register', forwardAuthenticated, (req,res) => {
    res.render('register', {title: 'Honeycomb-Register', layout: 'landing'})
})

router.post('/register', (req,res) => {

    const { username, email,  pw1, pw2, ifAdmin } = req.body;

    if( Acct.ifExists(email) )
    {
        res.render( 'register', {
            error: "User Already Existed With The Email"
        })
    }
    else{
        Acct.create(username, email, pw1, pw2, ifAdmin);
        req.flash("msg", "Registration Successful")
        res.redirect('/');
    }
    
});

module.exports = router;