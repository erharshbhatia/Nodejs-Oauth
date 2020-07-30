const express = require('express');
const router = express.Router();

const authCheck = (req, res, next)=>{
    if(!req.user){
        //if user is not logged in
        res.redirect('/auth/login');
    }
    else{
        //if logged in
        next();
    }
};


router.get('/', authCheck, (req, res)=>{
    // console.log(req.query);
    // const user = JSON.parse(req.query.user);
    //res.send('You are logged in, this is your profile-'+ req.user.username);
    //console.log(req.session.user);
    
    res.send('You are logged in, this is your profile-'+ req.user.username);

});

module.exports = router;