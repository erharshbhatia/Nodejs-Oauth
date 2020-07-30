const express = require('express');
const app = express();
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyparser = require('body-parser');
//const expressSession = require('express-session');




mongoose.connect(keys.mongodb.dbURI,()=>{
    console.log("Connected to MongoDB");
});

app.use(cookieSession({
    maxAge: 24*60*60*1000,//one day long
    keys: [keys.session.cookieKey]//this will encrypt our cookie
}));
//initialize passport
// app.use(expressSession({
//     secret: 'harshhghghgjhghgjhjhkj',
//     resave: false,
//     saveUninitialized: true
// }));


app.use(bodyparser.json());
app.use(bodyparser.urlencoded());


app.use(passport.initialize());//initializing passport 
app.use(passport.session());//to control session cookies while logging in


app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);


app.set('view engine', 'ejs');
app.get('/', (req, res)=>{
    res.render('home');
});
app.listen(3000, ()=>{
   console.log('Listening on port 3000'); 
});