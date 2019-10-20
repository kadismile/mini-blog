var passport = require('passport');
module.exports = authorize;

function authorize(role) {
  return [
    (req, res, next) => {
      passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
          return res.status(500).json({status: 'failed', message: err})
        }

        if (info !== undefined) {
          return res.status(401).json({status: 'Error', message: "UnAuthorized"});
        }

        if (user.role !== role) {
          return res.status(401).json({message: 'UnAuthorized'});
        } else {
          return next();
        }
      })(req, res, next);
    }
  ];
}