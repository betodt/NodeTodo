var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/userModel');

module.exports = function(passport) {
	passport.use(new LocalStrategy(function(username, password, done) {
		User.findOne({ username: username }, function(err, user) {
			if(err) { return done(err, false); }
			
			if(!user) {
				return done(null, false, { message: 'Username not found' });
			} 
			
			user.comparePassword(password, function(err, same) {
				if(err) { throw err; }

				if(!same) {
					return done(null, false, { message: 'Incorrect password' });
				}
				return done(null, user);
			});
		});
	}));
};