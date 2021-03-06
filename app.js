require('dotenv').config()

const express = require('express');
const app =  express();
const passport = require('passport')

const cookieSession = require('cookie-session')


require('./auth')



app.use(cookieSession({
    name: 'music-map',
    keys: ['key1', 'key2']
  }))

app.set("view engine", "ejs")

// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}
// Initializes passport and passport sessions
app.use(passport.initialize())
app.use(passport.session())

// Example protected and unprotected routes
app.get('/', (req, res) => res.render('index'))
app.get('/failed', (req, res) => res.send('You Failed to log in!'))

// In this route you can see that if the user is logged in u can acess his info in: req.user
app.get('/map', isLoggedIn, (req, res) =>{
   
  res.render("map",{name:req.user.displayName,pic:req.user.photos[0].value,email:req.user.emails[0].value})
})




// In this route you can see that if the user is logged in u can acess his info in: req.user
app.get('/profile', isLoggedIn, (req, res) =>{
   
    res.render("profile",{name:req.user.displayName,pic:req.user.photos[0].value,email:req.user.emails[0].value})
})

// Auth Routes
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/map');
  }
);

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})


app.listen(3000, () => console.log('Escuchando: 3000'));