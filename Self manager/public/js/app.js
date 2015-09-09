var $content = $('#content');

(function(){
	var sammyApp = Sammy('#content', function() {

		this.get('#/', homeController.all);

		/*this.get('#/users', loginController.all)*/

		this.get('#/users/register', registerController.register);

		this.get('#/users/login', loginController.login);

		this.get('#/todos',todosController.all);

		this.get('#/todos/add',todosController.add);

		this.get('#/events',eventsController.all);

		this.get('#/events/add',eventsController.add);
	});

	$(function(){
		sammyApp.run('#/');


        if(data.users.hasUser()){
            $('#login').addClass('hidden');
            $('#register').addClass('hidden');
        }else{
            $('#logout').addClass('hidden');
        }

         $('#logout').on('click',function(){
         data.users.logout()
            .then(function () {
                toastr.warning('User is logout!');
                location = '#/';
                document.location.reload(true);
            });

    });
	});
}());