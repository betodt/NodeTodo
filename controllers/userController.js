var Users = require('../models/userModel');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');
var config = require('../config');

module.exports = function(app, passport) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.get('/api/users/:username', function(req, res) {
        Users.findOne({ username: req.params.username }, function(err, user) {
            if(err) throw err;
            
            if(!user) {
                res.status(404).end();
            } else {
                res.send(user);
            }
        });
    });
    
    // signup
    app.post('/api/signUp', function(req, res) {

        if(!req.body.name || !req.body.password) {
            res.json({ success: false, msg: 'Please pass name and password.'});
        } else {

            var newUser = Users({
                username: req.body.name,
                password: req.body.password
            });

            newUser.save(function(err) {
                if (err) { 
                    console.log(err);
                    return res.json({ success: false, msg: 'Username already exist.' });
                }

                res.json({ success: true, msg: 'Successful created new user.' });
            });

        }

    });

    // login
    app.post('/api/authenticate', passport.authenticate('local', { session: false }), function(req, res) {
        res.send(req.user);
    });
    
}