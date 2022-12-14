const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;


const Doctor = require('../models/doctor');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),   // bearer has the the 'jwt' token
    secretOrKey: 'hospital-api-secret-key'     // 'hospital-api-secret-key' is our encryption and decryption key
}

passport.use(new JWTStrategy(opts, function(jwtPayLoad, done) {  // 'jwtPayLoad' contains the payload (which is inside the jwt token), and it contains doctor's info
    Doctor.findById(jwtPayLoad._id, function(err, doctor) {
        if(err) {
            console.log(err);
            return done(err);
        }

        if(doctor) {
            return done(null, doctor);
        } else {
            return done(null, false);
        }
    });
}));


module.exports = passport;


