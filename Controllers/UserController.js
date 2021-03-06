const jwtSecret = require('../config/jwtConfig');
const User = require('../Models/User');
const user = require('../helpers/users');
var passport = require('passport');
var jwt = require('jsonwebtoken');

exports.user_create = async (req, res, next) => {

  passport.authenticate('register', async (err, userData, info) => {
    if (err) {
      console.log(err);
    }
    if (info !== undefined) {
      res.status(409).json({status: 'failed', message: info.message});
    }
    if (await user.findUserByEmail(req.body.email)) {
      res.status(409).json({status: 'failed', message: `user with email '${req.body.email}' already exists`});
    }
    else {
      try {
        const data = {
          name: req.body.name,
          email: req.body.email,
          agentProfile: req.body.agentProfile,
        };
        await User.updateOne({_id: userData._id}, {$set: data});
        res.status(200).json({status: 'Success', message: userData});
      } catch (e) {
        console.log(e);
        res.status(500).json({status: 'Error', message: "An Error Occured"});
      }
    }
  })(req, res, next);
};

  exports.user_login = async(req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
      if (err) {
        console.log(err);
      }
      if (info !== undefined) {
        res.status(409).json({status: 'failed', message: info.message});
      } else {
        try{
          const token = jwt.sign({ id: user.username }, jwtSecret.secret, { expiresIn: '720m' })
          let authUser = {};
          authUser.authenticated = true,
          authUser.authToken = token,
          res.status(200).send({
            user: {...authUser, ...user._doc},
            message: 'Success',
          });
        }catch (e) {
          console.log(e)
        }
      }
    })(req, res, next);
  };

exports.find = async(req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      console.log(err);
    }
    if (info !== undefined) {
      res.status(401).json({status: 'Error', message: "UnAuthorized"});
    } else {
      res.status(200).send({
        auth: true,
        user
      });
    }
  })(req, res, next);
};

exports.logout = async(req, res, next) => {
  req.logout();
  res.status(200).send({
    message: 'Logged Out Successfully',
  });
};
