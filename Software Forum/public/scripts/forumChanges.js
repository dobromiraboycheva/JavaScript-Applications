var sammyApp = Sammy('#content', function () {
    var $content = $('#content');

    this.get('#/', function () {
        templates.get('start')
            .then(function (template) {
                $content.html(template());
            });
    });

    this.get('#/threads', function () {
        var threads;
        data.threads.get()
            .then(function (res) {
                threads = res.result;
                return templates.get('threads');
            })
            .then(function (template) {
                $content.html(template(threads));
            });
    });

    this.get('#/thread-add', function (context) {
        templates.get('threads-add')
            .then(function (template) {
                $content.html(template());
                $('#button-add-thread').on('click', function () {
                    var title = $('#textbox-thread-title').val();
                    data.threads.add(title)
                        .then(function () {
                            context.redirect('#/threads');
                        });
                });
            });
    });

    this.get('#/threads/:id', function () {
        var thread;
        data.threads.getById(this.params.id)
            .then(function (res) {
                thread = res.result;
                return templates.get('thread-details');
            })
            .then(function (template) {
                $content.html(template(thread));
            });
    });

    this.get('#/threads/:threadId/messages/add', function (context) {
        var threadId = this.params.threadId;
        templates.get('message-add')
            .then(function (template) {
                $content.html(template());
                $('#button-add-message').on('click', function () {
                    var text = $('#textbox-add-text').val();
                    data.threads.addMessage(threadId, {
                        text
                    }).then(function (res) {
                        console.log(res);
                        context.redirect('#/threads/' + threadId);
                    });
                })
            });
    });


    this.get('#/users', function () {
        var users;
        data.users.get()
            .then(function (res) {
                users = res.result;
                return templates.get('users');
            })
            .then(function (template) {
                $content.html(template(users));
            });
    });


    this.get('#/login', function (context) {
        if (data.users.current()) {
            context.redirect('#/');
            return;
        }
        templates.get('login')
            .then(function (template) {
                $content.html(template());
                $('#button-login').on('click', function () {
                    var user = {
                        username: $('#textbox-user').val(),
                        password: $('#textbox-pass').val()
                    };
                    data.users.login(user)
                        .then(function (user) {
                            context.redirect('#/');
                            document.location.reload(true);
                        });
                });
            });
    });
        this.get('#/register', function (context) {
            if (data.users.current()) {
                context.redirect('#/');
                return;
            }
            templates.get('register')
                .then(function (template) {
                    $content.html(template());
                    $('#button-register').on('click', function () {
                        var user = {
                            username: $('#textbox-user').val(),
                            password: $('#textbox-pass').val()
                        };

                        data.users.register(user)
                            .then(function (user) {
                                context.redirect('#/');
                                document.location.reload(true);
                            });
                    });

                });

        });
    });

    $(function () {
        sammyApp.run('#/');
        if (data.users.current()) {
            $('#login').addClass('hidden');
            $('#register').addClass('hidden');


        } else {
            $('#button-logout').addClass('hidden');
        }

        $('#button-logout').on('click', function () {
            data.users.logout()
                .then(function () {
                    location = '#/';
                    document.location.reload(true);
                });
        });
    });
