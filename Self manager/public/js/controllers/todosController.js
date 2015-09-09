var todosController=(function(){
		function all(context) {
			var todos;
			var category = context.params.category || null;
			data.todos.get()
				.then(function (resTodos) {
					todos = _.chain(resTodos)
						.groupBy(helperController.groupByCategory)
						.map(helperController.parseGroup).value();

					if (category) {
						todos = todos.filter(help.filterByCategory(category));
					}

					return templates.get('todos');
				})
				.then(function (template) {
					$content.html(template(todos));

					$('.todo-box').on('change', function () {
						var $checkbox = $(this).find('input');
						var isChecked = $checkbox.prop('checked');
						var id = $(this).attr('data-id');
						data.todos.update(id, {
							state: isChecked
						})
						.then(function (todo) {
							toastr.clear();
							toastr.warning(`TODO "${todo.text}" updated!`);
						});
					});
				})
				.catch(function (err) {
					toastr.error(JSON.stringify(err));
				});
		}


		function add(context){
		templates.get('todo-add')
			.then(function(template){
				$content.html(template());
				return data.categories.get();
			})
			.then(function (categories) {
				$('#add-todo-button').on('click', function () {
					var todo = {
						text: $('#todo-textbox').val(),
						category: $('#todo-category').val()
					};

					data.todos.add(todo)
						.then(function (todo) {
							toastr.success(`TODO ${todo.text} added!`);
							context.redirect('#/todos');
						});
				});
				return data.categories.get();
			}).then(function(categories){
				$('#todo-category').autocomplete({
					source: categories
			    });
			});
		}

	return{
		all:all,
		add:add
	}
}());