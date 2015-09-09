var data=(function(){
	const LOCAL_STORAGE_USERNAME_KEY='user-name-key',
		LOCAL_STORAGE_AUTHKEY_KEY='user-authkey-key';

	/*Users*/

	/*function login(user){
		var currentUser={
			username:user.username,
			passHash:CryptoJS.SHA1(user.password).toString()
		};
		var promise=new Promise(function(resove,reject){
			$.ajax({
				url:'api/users/auth',
				method:'PUT',
				contentType:'application/json',
				data:JSON.stringify(currentUser),
				success:(function(user){
					localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY,user.username);
					localStorage.setItem(LOCAL_STORAGE_AUTHKEY_KEY,user.authKey);
					resove(user);
				})
			});
		});
		return promise;
	}*/


	/*used jsonRequester*/
	function login(user){
		var currentUser={
			username:user.username,
			passHash:CryptoJS.SHA1(user.password).toString()
		};

		var options={
			data:currentUser
		};

		return jsonRequester.put('api/users/auth',options)
		.then(function(res){
				var user=res.result;
				localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY,user.username);
				localStorage.setItem(LOCAL_STORAGE_AUTHKEY_KEY,user.authKey);
				return user;
			});
	}


	function register(user){
		var currentUser={
			username:user.username,
			passHash:CryptoJS.SHA1(user.password).toString()
		};

		var options={
			data:currentUser
		};

		return jsonRequester.post('api/users',options)
			.then(function(res){
				var user=res.result;
				localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY,user.username);
				localStorage.setItem(LOCAL_STORAGE_AUTHKEY_KEY,user.authKey);
				return {
					username:res.result.username
				}
			});
	}

	function logout(){
		var promise=new Promise(function(resolve, reject){
			localStorage.removeItem(LOCAL_STORAGE_USERNAME_KEY);
			localStorage.removeItem(LOCAL_STORAGE_AUTHKEY_KEY);
			resolve();
		});
		return promise;
	}

	function usersGet() {
		return jsonRequester.get('api/users')
			.then(function(res) {
				return res.result;
			});
	}

	function hasUser() {
		return !!localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY) &&
			!!localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY);
	}

	/*TODOs*/

	function todosGet(){
		var options={
			headers:{
				'x-auth-key':localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
			}
		};
		return jsonRequester.get('api/todos',options)
		.then(function (res) {
				return res.result;
			});
	}

	function todosAdd(todo){
		var options={
			data:todo,
			headers:{
				'x-auth-key':localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
			}
		};

		return jsonRequester.post('api/todos',options)
		.then(function(res){
				return res.result;
			});
	}

	function todosUpdate(id,todo){
		var options={
			data:todo,
			headers:{
				'x-auth-key':localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
			}
		};
		return jsonRequester.put('api/todos/'+id,options)
		.then(function(res){
				return res.result;
			});
	}

	/*Events*/
	function eventsGet(){
		var options={
			headers:{
				'x-auth-key':localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
			}
		};
		return jsonRequester.get('api/events',options)
			.then(function (res) {
				return res.result;
			});
	}

	function eventsAdd(event){
		var options={
			data:event,
			headers:{
				'x-auth-key':localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
			}
		};

		return jsonRequester.post('api/events',options)
			.then(function(res){
				return res.result;
			});
	}


	/*Categories*/
	function categoriesGet(){
		var options={
			headers:{
				'x-auth-key':localStorage.getItem(LOCAL_STORAGE_AUTHKEY_KEY)
			}
		};
		return jsonRequester.get('api/categories',options)
			.then(function (res) {
				return res.result;
			});
	}


	return{
		users: {
			login,
			logout,
			register,
			hasUser,
			get: usersGet
		},
		todos:{
			add:todosAdd,
			get:todosGet,
			update:todosUpdate
		},
		events:{
			add:eventsAdd,
			get:eventsGet
		},
		categories:{
			get:categoriesGet
		}
}

}());