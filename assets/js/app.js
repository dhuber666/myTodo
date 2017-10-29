$(document).ready(function() {
	// key codes

	const ENTER_KEY = 13;
	const ESCAPE_KEY = 27;

	var Model = {
		todos: [
			{
				title: 'wash dishes',
				completed: false
			}
		]
	};

	var Controller = {
		eventListener: function() {
			document
				.getElementById('addTodo')
				.addEventListener('keyup', this.addTodo.bind(this));

			document
				.querySelector('.show')
				.addEventListener('click', this.deleteTodo.bind(this));
		},
		getTodos: function() {
			return Model.todos;
		},
		addTodo: function(event) {
			var element = event.target;
			var todoText = event.target.value;
			var keyPressed = event.keyCode;

			if (keyPressed === ENTER_KEY && todoText) {
				this.saveTodo(todoText);
				element.value = '';
				View.render();
			}

			if (keyPressed === ESCAPE_KEY) {
				element.value = '';
			}
		},
		editTodo: function(index, newTodoText) {
			Model.todos[index] = newTodoText;
		},
		deleteTodo: function(event) {
			var target = event.target;
			var todoText = $(target)
				.closest('div')
				.text();
			console.log(todoText);
			var indexOfElementToDelete = this.getIndexOfElement(todoText);
			console.log(indexOfElementToDelete);
			Model.todos.splice(indexOfElementToDelete, 1);
			View.render();
		},
		getIndexOfElement: function(element) {
			console.log(element);
			var index = -1;
			Model.todos.forEach(function(todo, i) {
				console.log(todo.title);
				if (todo.title === element) {
					index = i;
				}
			});
			return index;
		},
		saveTodo: function(todoText) {
			var todo = {
				title: todoText,
				completed: false
			};
			Model.todos.push(todo);
		}
	};

	var View = {
		render: function() {
			this.showTodos();
		},
		initialize: function() {
			this.render();
			Controller.eventListener();
		},
		showTodos: function() {
			var showTodos = document.querySelector('.todos'); // fetch the todos UL
			showTodos.innerHTML = '';
			Model.todos.forEach(function(todo) {
				var currentTodo = document.createElement('div');
				currentTodo.className = 'todo';
				currentTodo.innerHTML =
					"<input type='checkbox' id='complete'>" +
					'<p>' +
					todo.title +
					'</p>' +
					"<i class='fa fa-trash-o delete' aria-hidden='true'></i>";
				showTodos.appendChild(currentTodo);
			});
		}
	};

	View.initialize();
});
