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
			// for editing todo
			document
				.querySelector('.show')
				.addEventListener('keyup', this.editTodo.bind(this));
			// for completing todo
			document
				.querySelector('.show')
				.addEventListener('click', this.completeTodo.bind(this));
		},
		getTodos: function() {
			return Model.todos;
		},
		getTodo: function(index) {
			return Model.todos[index];
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
			if ($(event.target).hasClass('todoText')) {
				var textField = $(event.target)
					.parent()
					.find("input[type='text']");
				var currentText = $(event.target).text();
				var clickedTodo = $(event.target).closest('div');
				clickedTodo.addClass('editing');
				textField.val(currentText);
				textField.focus();
			}
		},
		editTodo: function(event) {
			var currentText = $(event.target).val();
			var keyPressed = event.keyCode;
			if (keyPressed === ESCAPE_KEY) {
				$(event.target)
					.closest('div')
					.removeClass('editing');
			}
			if (keyPressed === ENTER_KEY) {
				console.log(
					$(event.target)
						.parent()
						.find('p')
				);
				$(event.target)
					.parent()
					.find('p')
					.text(currentText);
				$(event.target)
					.closest('div')
					.removeClass('editing');
			}
		},
		deleteTodo: function(event) {
			var clickedTodo = $(event.target);
			if (clickedTodo.hasClass('delete')) {
				var indexOfElementToDelete = this.getIndexOfElement(clickedTodo);
				Model.todos.splice(indexOfElementToDelete, 1);
				View.render();
			}
		},
		completeTodo: function(event) {
			if ($(event.target).hasClass('complete')) {
				var clickedTodo = $(event.target);
				// fetch the paragraph and toggle class

				var paragraph = clickedTodo
					.parent()
					.find('p')
					.toggleClass('completed');
				console.log(paragraph.hasClass('completed'));
				var clicked = clickedTodo.prop('checked');
				var indexOfTodo = this.getIndexOfElement(clickedTodo);
				var todo = Controller.getTodo(indexOfTodo);
				todo.completed = !todo.completed;
				this.todoChange(indexOfTodo, todo);
				View.render();
			}
		},
		getIndexOfElement: function(element) {
			var todoText = $(element)
				.closest('div')
				.text();
			var index = -1;
			Model.todos.forEach(function(todo, i) {
				if (todo.title === todoText) {
					index = i;
				}
			});
			return index;
		},
		todoChange: function(index, todo) {
			Model.todos.splice(index, 1, todo);
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
			Controller.getTodos().forEach(function(todo) {
				var currentTodo = document.createElement('div');
				currentTodo.className = 'todo';
				var paragraph = todo.completed
					? '<p class="todoText completed">' + todo.title + '</p>'
					: '<p class="todoText">' + todo.title + '</p>';

				currentTodo.innerHTML =
					"<input type='checkbox' class='complete'>" +
					paragraph +
					'<input type="text" id="editTodo">' +
					"<i class='fa fa-trash-o delete' aria-hidden='true'></i>";
				showTodos.appendChild(currentTodo);
			});
		}
	};

	View.initialize();
});
