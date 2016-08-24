var Todos = require('../models/todoModel');
var bodyParser = require('body-parser');

module.exports = function(app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.get('/api/todos', function(req, res) {

        Todos.find({ userId : req.query.userId }, function(err, todos) {
            if (err) throw err;
            
            res.send(todos);
        });
        
    });
    
    app.get('/api/todos/:id', function(req, res) {

        Todos.findById({ _id: req.params.id }, function(err, todo) {
            if (err) throw err;

            res.send(todo);
        });

    });
    
    app.post('/api/todos', function(req, res) {

        var newTodo = Todos({
            userId: req.body.userId,
            todo: req.body.todo,
            isDone: req.body.isDone,
            hasAttachment: req.body.hasAttachment
        });

        newTodo.save(function(err) {
            if (err) throw err;
            res.send('Success');
        });

    });

    app.put('/api/todos/:id', function(req, res) {
      if (req.params.id) {
          Todos.findByIdAndUpdate(req.params.id, { 
            
            todo: req.body.todo, 
            isDone: req.body.isDone, 
            hasAttachment: req.body.hasAttachment 
        
        }, 
        function(err, todo) {
              if (err) throw err;
              
              res.send('Success');
        });
      }
  });
    
    app.delete('/api/todos/:id', function(req, res) {

        Todos.findByIdAndRemove(req.params.id, function(err) {
            if (err) throw err;
            res.send('Success');
        })
        
    });
    
}