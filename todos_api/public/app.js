let ENTER_KEYPRESS_EVENT = 13;

$(document).ready(function(){
 	getDataAndDisplay();
	
	$('#todoInput').keypress(function(event){
		if(event.which == ENTER_KEYPRESS_EVENT){
			createTodo();
		}
	});
	
	$('.list').on('click', 'span', function(){
		removeTodo($(this).parent());
	});
	
	$('.list').on('click', 'li',function(){
	 	toggleTodo($(this));
	})
});

function addTodos(todos){
	todos.forEach(function(todo){
		addTodo(todo);
	});
}

function addTodo(todo){
	var newTodo = $('<li class="task">' + todo.name + '<span>X</span>'+'</li>');
	newTodo.data('id', todo._id);
	newTodo.data('completed', todo.completed);
		if(todo.completed){
			newTodo.addClass('done');
		}
		$('.list').append(newTodo);
}

function getDataAndDisplay(){
	$.getJSON('api/todos')
	.then(addTodos)
	.catch(function(error){
		console.log(error);
	});
}

function createTodo(){
	var data = $('#todoInput').val();
	var jsonObj = {name: data};
	$.post('api/todos', jsonObj)
	.then(function(newTodo){
		addTodo(newTodo);
		$('#todoInput').val('');
	})
	.catch(function(error){
		console.log(error);
	});
}

function removeTodo(listItem){
	var todoId = listItem.data('id');
	var url = 'api/todos/' + todoId;
	$.ajax({
		type: 'DELETE',
		url: url
	}).
	then(function(data){
		console.log(data);
		listItem.remove();
	});
}
	
	function toggleTodo(listItem){
		var todoId = listItem.data('id');
		var status = listItem.data('completed');
		status = !status;
		var url = 'api/todos/' + todoId;
		$.ajax({
			type: 'PUT',
			url: url,
			data: {completed: status}
		}).
		then(function(){
			listItem.data('completed', status);
			listItem.toggleClass('done');
		});
	}