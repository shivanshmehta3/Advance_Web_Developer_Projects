const todoSchema = require('./todoSchema');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todos-backend');
mongoose.set('debug',true);
mongoose.Promise = Promise;

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;