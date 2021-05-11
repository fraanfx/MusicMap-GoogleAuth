const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const GOOGLE_CLIENT_ID = '354698378584-b29obui86gap2gk10jafit6hehl55q3b.apps.googleusercontent.com';

const GOOGLE_CLIENT_SECRET = 'dafsiPX5-VbZTExVFVSMqllk';

const GOOGLE_CALLBACK = 'http://localhost:3000/google/callback';

passport.serializeUser(function(user, done) {
    /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    /*
    Instead of user this function usually recives the id 
    then you use the id to select the user from the db and pass the user obj to the done callback
    PS: You can later access this data in any routes in: req.user
    */
    done(null, user);
});
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID, //354698378584-b29obui86gap2gk10jafit6hehl55q3b.apps.googleusercontent.com
    clientSecret: GOOGLE_CLIENT_SECRET, //dafsiPX5-VbZTExVFVSMqllk
    callbackURL: GOOGLE_CALLBACK,
    passReqToCallback: true 
 
  },
  function(request, accessToken, refreshToken, profile, done) {
    console.log(profile)
    return done(null, profile);
  }
));