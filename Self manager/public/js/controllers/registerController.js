var registerController=(function(){
	function register(context){
		templates.get('register')
			.then(function (template){
				$content.html(template());

				$('#register-button').on('click',function(){
					var user={
						username:$('#username-input').val(),
						password:$('#password-input').val()
					};
					data.users.register(user)
						.then(function(){
							toastr.success('User is register!');
							console.log('User is register!');
							context.redirect('#/');
							document.location.reload(true);
						});
				});
			});
	}
	return{
		register:register
	}
}());