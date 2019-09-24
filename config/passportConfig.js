const jwtSecret = require('./jwtConfig');
const bcrypt = require('bcryptjs');
const BCRYPT_SALT_ROUNDS = 12;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../Models/User');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const user = require('../util/users');


passport.use('register', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      emailField: 'email',
      session: false,
    }, async (username, password, done) => {
      try {
        if(await user.findUserByUsername(username)){
          return done(null, false, { message: 'User already Exists!!' });
        }
        let newUser = {username, password};
          bcrypt.hash(password, BCRYPT_SALT_ROUNDS, async function(err, hash) {
            newUser.password = hash;
            const user = new User(newUser);
            await user.save();
            if(!err){
              return done(null, user);
            }
          });
      } catch (err) {
        done(err);
      }
    },
  ),
);

passport.use('login', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      session: false,
    },
    async (username, password, done) => {
      try {
        let  foundUser = await user.findUserByUsername(username);
        if(user){
          bcrypt.compare(password, foundUser.password, async function(err, hash) {
            if (hash !== true) {
              return done(null, false, { message: 'passwords do not match' });
            }
            return done(null, foundUser);
          });
        }else{
          return done(null, false, { message: 'Bad Login' });
        }
      } catch (err) {
        done(err);
      }
    },
  ),
);

const opts = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('BEARER'),
  secretOrKey: jwtSecret.secret,
};

passport.use('jwt', new JWTstrategy(opts, async (jwt_payload, done) => {
    try {
      let  foundUser = await User.findOne({username: jwt_payload.id});
        if (foundUser) {
          // note the return removed with passport JWT - add this return for passport local
          done(null, foundUser);
        } else {
          console.log('user not found in db');
          done(null, false);
        }
    } catch (err) {
      done(err);
    }
  }),
);
