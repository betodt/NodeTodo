var Users = require('../models/userModel');
var bodyParser = require('body-parser');

module.exports = function(app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.get('/api/users', function(req, res) {

        Users.find(function(err, users) {
            if (err) throw err;
            
            res.send(users);
        });
        
    });
    
    app.get('/api/users/:id', function(req, res) {

        Users.findById({ _id: req.params.id }, function(err, user) {
            if (err) throw err;

            res.send(user);
        });

    });
    
    app.post('/api/users', function(req, res) {

        var newUser = Users({
            username: req.body.username,
            password: req.body.password
        });

        newUser.save(function(err) {
            if (err) throw err;

            res.send('Success');
        });

    });

    app.put('/api/users/:id', function(req, res) {
      if (req.params.id) {
          Users.findByIdAndUpdate(req.params.id, { 
            username: req.body.username, 
            password: req.body.password 
        }, function(err, todo) {
              if (err) throw err;
              
              res.send('Success');
          });
      }
  });
    
    app.delete('/api/users/:id', function(req, res) {

        Users.findByIdAndRemove(req.params.id, function(err) {
            if (err) throw err;

            res.send('Success');
        })
        
    });
    
}