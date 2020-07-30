const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user-model');
const keys= require('./keys');


passport.serializeUser((user, done)=>{
   done(null, user.id); 
});
passport.deserializeUser((id, done)=>{
    User.findById(id).then((user)=>{
        done(null, user);
    });
});
 

passport.use(
    new GoogleStrategy({
        //options for the google strategy
        callbackURL: keys.callbackURL,  
        clientID: keys.clientID,
        clientSecret: keys.clientSecret
    }, (accessToken, refreshToken, profile, done)=>{
        //passport callback function
        
        User.findOne({googleId: profile.id}).then((currentUser)=>{
           
            if(currentUser){
                console.log("already existing user", currentUser);
                done(null, currentUser);
            } 
            else{
                new User({
                    username: profile.displayName,
                    googleId: profile.id
                }).save().then((newUser)=>{
                    console.log('new user created'+newUser);
                    done(null, newUser);
                });
                        
            }
        });
    
        //this 'save' function is an asynchronous task
        //therfore it returns a promise
        
    })
)