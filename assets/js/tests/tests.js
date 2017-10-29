tests({
	'it should return all todos in an array': function() {
		var todos = Controller.getTodos();
		eq(todos.length, 3);
	},
	'it should save new todos': function() {
		Controller.addTodo('wash my car');
		var todos = Controller.getTodos();
		eq(todos.length, 4);
	},
	'it should be able to edit a todo': function() {
		var todos = Controller.getTodos();
		Controller.editTodo(0, 'love dog');
		eq(todos[0], 'love dog');
	},
	'it should be able to delete a todo': function() {
		Controller.resetTodos();
		var todos = Controller.getTodos();
		Controller.deleteTodo(0);
		eq(todos.length, 2);
	}
});
