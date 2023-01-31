const express = require('express');
const router = express.Router();
const passport = require('passport');
const {forwardAuthenticated } = require('../config/auth');

// Use Main Layout for Non-admins
router.all('/*', function (req, res, next) {
    req.app.locals.layout = 'main';
    next();
});


router.get('/', forwardAuthenticated, (req,res) => {
    res.render('login', {title: 'Honeycomb-Login', layout: 'landing'})
})

router.post('/', (req, res, next) => {
    passport.authenticate('local', {
    successRedirect: '/catalogue',
    failureRedirect: '/',
    failureFlash: true
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('msg', 'You are logged out');
    res.redirect('/');
});

module.exports = router;