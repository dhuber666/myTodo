var Model = {
	todos: ['wash dishes', 'walk dog', 'love me']
};

var Controller = {
	// this function is just for the tests
	resetTodos: function() {
		Model.todos = ['wash dishes', 'walk dog', 'love me'];
	},
	eventListener: function() {
		document.getElementById('add').addEventListener('onkeyup', this.addTodo);
	},
	getTodos: function() {
		return Model.todos;
	},
	addTodo: function(todoText) {
		console.log('servus', todoText);

		Model.todos.push(todoText);
	},
	editTodo: function(index, newTodoText) {
		Model.todos[index] = newTodoText;
	},
	deleteTodo: function(index) {
		Model.todos.splice(index, 1);
	}
};

var View = {
	render: function() {
		this.showTodos();
		Controller.eventListener();
	},
	showTodos: function() {
		var showTodos = document.querySelector('.todos'); // fetch the todos UL
		Model.todos.forEach(function(todo) {
			var currentTodo = document.createElement('li');
			currentTodo.innerText = todo;
			showTodos.appendChild(currentTodo);
		});
	}
};
View.render();
