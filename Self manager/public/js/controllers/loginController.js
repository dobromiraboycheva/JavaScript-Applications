var loginController=(function(){
/*	function all(context){
		var users;
		data.users.get()
		.then(function(currentUser){
		users=currentUser;
		return template.get('login');
	})
	.then(function(template){
			context.$element().html(template(users));
				$('.btn-add-friend').on('click', function() {
					var id = $(this).parents('.user-box').attr('data-id');
					data.friends.sentRequest(id);
				});
			})*/


	function login(context){
		templates.get('login')
		.then(function (template){
				$content.html(template());

				$('#login-button').on('click',function(){
					var user={
						username:$('#username-input').val(),
						password:$('#password-input').val()
					};
					data.users.login(user)
					.then(function(){
							toastr.success('User is login!');
							context.redirect('#/');
							document.location.reload(true);
						});
				});
			});
	}

	return{
		login:login
	}
}());