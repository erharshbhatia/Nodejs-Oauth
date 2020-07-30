const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportSetup = require('../config/passport-setup');
const url = require('url');

router.get('/login', (req, res)=>{
    res.render('login');
});

router.get('/logout', (req, res)=>{
    //handle with passport.js
    req.logout();
    res.redirect('/');
});

router.get('/google', passport.authenticate('google', {
    scope: ['profile']//basically telling what we want to retrieve from user's profile
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res)=>{
    // console.log(req.user);
    //req.session.user = req.user;
    //console.log("session:", req.session.user);
     //res.redirect('/profile?user='+JSON.stringify(req.user));
//     res.redirect(url.format({
//         pathname: '/profile',
//         query: JSON.stringify(req.user)
  //   }))
  res.redirect('/profile'); 
 });


module.exports = router;