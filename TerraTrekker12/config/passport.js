const passport = require('passport');
const userModel = require('../model/user.model');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'secretkey',
};
passport.use(new JwtStrategy(jwtOptions, async function (jwtPayload, done) {
  try {
    const user = await userModel.findById(jwtPayload.sub);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

module.exports = passport.authenticate('jwt', { session: false });
