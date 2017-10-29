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
			// for the input field where you add new todos
			document
				.getElementById('addTodo')
				.addEventListener('keyup', this.addTodo.bind(this));
			// for the delete button of each Todo
			document
				.querySelector('.show')
				.addEventListener('click', this.deleteTodo.bind(this));
			// for entering edit mode
			document
				.querySelector('.show')
				.addEventListener('dblclick', this.editMode.bind(this));
			document
				.querySelector('.show')
				.addEventListener('keyup', this.editTodo.bind(this));
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
		editMode: function(event) {
			var textField = $(event.target)
				.parent()
				.find("input[type='text']");
			var currentText = $(event.target).text();
			var clickedTodo = $(event.target).closest('div');
			clickedTodo.addClass('editing');
			textField.val(currentText);
		},
		editTodo: function(event) {
			//TODO: Implement this function next
			console.log($(event.target).val());
		},
		deleteTodo: function(event) {
			var clickedTodo = $(event.target);
			if (clickedTodo.hasClass('delete')) {
				var indexOfElementToDelete = this.getIndexOfElement(clickedTodo);
				Model.todos.splice(indexOfElementToDelete, 1);
				View.render();
			}
		},
		getIndexOfElement: function(element) {
			var todoText = $(element)
				.closest('div')
				.text();
			var index = -1;
			Model.todos.forEach(function(todo, i) {
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
					'<input type="text" id="editTodo">' +
					"<i class='fa fa-trash-o delete' aria-hidden='true'></i>";
				showTodos.appendChild(currentTodo);
			});
		}
	};

	View.initialize();
});
