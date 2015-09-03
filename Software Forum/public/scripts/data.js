var data=(function () {
    const USERNAME_STORAGE_KEY='username_key',
        USER_AUTH_KEY_STORAGE_KEY='auth-key';

    function userLogin(user){
        var promise=new Promise(function(resove,reject){
            var currentUser= {
                username: user.username,
                passHash: CryptoJS.SHA256(user.password).toString()
            };
            console.log(user);
            console.log(currentUser);
            $.ajax({
                url:'api/auth',
                method:'PUT',
                contentType: 'application/json',
                data: JSON.stringify(currentUser),
                success: function (user) {
                    localStorage.setItem(USERNAME_STORAGE_KEY,user.username);
                    localStorage.setItem( USER_AUTH_KEY_STORAGE_KEY,user.authKey);
                    resove(user);
                }
            });
        });
        return promise;
    }

    function userRegister(user){
        var promise=new Promise(function(resove,reject){
           var currentUser={
               username: user.username,
               passHash: CryptoJS.SHA256(user.password).toString()
           };
            console.log(user);
            console.log(currentUser);
            $.ajax({
                url: 'api/users',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(currentUser),
                success: function (user) {
                localStorage.setItem(USERNAME_STORAGE_KEY, user.username);
                localStorage.setItem(USER_AUTH_KEY_STORAGE_KEY, user.authKey);
                 resove(user);
                }
            });
        });
        return promise
    }

    function userLogout(){
        var promise=new Promise(function(resove,reject){
            localStorage.removeItem(USERNAME_STORAGE_KEY);
            localStorage.removeItem(USER_AUTH_KEY_STORAGE_KEY);
            resove();
        });
        return promise;
    }

    function getCurrentUser(){
        var username=localStorage.getItem(USERNAME_STORAGE_KEY);
        if(!username){
            return null;
        }
        return{
            username:username
        };
    }


    function userById(id) {
        var promise = new Promise(function(resolve, reject) {
            $.getJSON(`api/users/${id}`, function(res) {
                resolve(res);
            });
        });
        return promise;
    }

    function usersGet(){
        var promise=new Promise(function(resove,reject){
            $.getJSON('api/users',function(res){
                res.result=res.result.map(function(user){
                    user.postDate=moment(new Date(user.postDate)).fromNow();
                    return user;
                });
                resove(res);
            });
        });
        return promise;
    }

    function threadsGet(){
        var promise=new Promise(function(resove,reject){
            $.getJSON('api/threads',function(res){
                res.result=res.result.map(function(thread){
                    thread.postDate=moment(new Date(thread.postDate)).fromNow();
                    return thread;
                });
                resove(res);
            });
        });
        return promise;
    }

    function threadsAdd(title){
        var promise=new Promise(function (resove,reject) {
           var body={
               title
           };
            console.log(body)
            $.ajax({
                url:'api/threads',
                method:'POST',
                data:JSON.stringify(body),
                headers:{
                    'x-authkey':localStorage.getItem(USER_AUTH_KEY_STORAGE_KEY)
                },
                contentType:'application/json',
                success:function(res){
                    resove(res);
                }
            })
        });
        return promise;
    }

    function threadById(id) {
        var promise = new Promise(function(resolve, reject) {
            $.getJSON(`api/threads/${id}`, function(res) {
                resolve(res);
            });
        });
        return promise;
    }

    function threadsAddMessage(threadId, message) {
        var promise = new Promise(function(resolve, reject) {
            $.ajax({
                url:`api/threads/${threadId}/messages`,
                method: 'POST',
                data: JSON.stringify(message),
                contentType: 'application/json',
                headers: {
                'x-authkey': localStorage.getItem(USER_AUTH_KEY_STORAGE_KEY)
            },
            success: function(res) {
                resolve(res);
            }
        });
    });
    return promise;
}


    return {
        users:{
            login:userLogin,
            register:userRegister,
            logout:userLogout,
            current:getCurrentUser,
            getById:userById,
            get:usersGet
        },
        threads:{
            get:threadsGet,
            add:threadsAdd,
            addMessage:threadsAddMessage,
            getById:threadById
        }
    }

}());