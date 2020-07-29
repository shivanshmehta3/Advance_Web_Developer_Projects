var express = require('express');
var router = express.Router();
var db = require('../model');

router.get('/', function(req, res){
	db.Todo.find()
	.then(function(todos){
		res.json(todos);
	})
	.catch(function(err){
		res.send(err);
	})
})

router.post('/', function(req, res){
	db.Todo.create(req.body)
	.then(function(newTodo){
		res.status(201).json(newTodo);
	})
	.catch(function(error){
		res.send(error);
	})
});

router.get('/:todoId', function(req, res){
	db.Todo.findById(req.params.todoId)
	.then(function(found_todo){
		res.json(found_todo);
	})
	.catch(function(error){
		res.send(error);
	})
})

router.put('/:todoId', function(req, res){
	db.Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new: true})
	.then(function(updated_todo){
		res.json(updated_todo);
	})
	.catch(function(error){
		res.send(error);
	})
})

router.delete('/:todoId', function(req, res){
	db.Todo.remove({_id: req.params.todoId})
	.then(function(){
		res.json({message: 'we deleted it!'});
	})
	.catch(function(error){
		res.send(error);
	})
})

module.exports = router;