var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb://karajrish:karajrish@ds133368.mlab.com:33368/karajrish_todo');

//Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
  item: String
});

var Todo = mongoose.model('Todo', todoSchema);

//var data = [{item:'get milk'},{item:'Walk dog'},{item:'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app){

  app.get('/todo', function(req,res){
    //get data from mongo db and pass it to the view
    Todo.find({},function(err,data){
      if(err) throw err;
      res.render('todo',{todos: data});
    }) //gets all items from collection

  });

  app.post('/todo',urlencodedParser, function(req,res){
    //get data from the view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err,data){
      if(err) throw err;
      res.json(data);
    })
    console.log(req.body);
  });

  app.delete('/todo:item',function(req,res){
    //delete the requested item from mongodb
    Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function(err,data){
      if(err) throw err;
      response.json(data);
    });
  });
}
