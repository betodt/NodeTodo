var Todos = require('../models/todoModel');

module.exports = function(app) {
    
  app.get('/api/setupTodos', function(req, res) {
     
   // seed database
   var starterTodos = [
     {
       userId: '57bcded6d3c3b996172f3d5a',
       todo: 'Buy milk',
       isDone: false,
       hasAttachment: false
     },
     {
       userId: '57bcded6d3c3b996172f3d5a',
       todo: 'Feed dog',
       isDone: false,
       hasAttachment: false
     },
     {
       userId: '57bcded6d3c3b996172f3d5a',
       todo: 'Learn Node',
       isDone: false,
       hasAttachment: false
     }
   ];

   Todos.create(starterTodos, function(err, results) {
       if(err) throw err;

       res.send(results);
   }); 

 }); 

  /*
  // DEBUG ONLY
  app.delete('/api/deleteTodos', function(req, res) {

    Todos.remove({}, function(err) {
        if(err) throw err;

        res.send('Success');
    });

  });
  */

}