var mongoose = require('mongoose');

var todosSchema = mongoose.Schema({
	name: {
		type: String,
		require: 'Name cannot be Empty!'
	},
	completed: {
		type: Boolean,
		default: false
	},
	created_date: {
		type: Date,
		default: Date.now
	}
});

var Todo = mongoose.model('Todo', todosSchema);

module.exports = Todo;