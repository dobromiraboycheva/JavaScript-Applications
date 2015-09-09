var eventsController=(function(){
    function all(context) {
        var events;
        var category = context.params.category || null;
        data.events.get()
            .then(function (resEvents) {
                events = _.chain(resEvents)
                    .groupBy(helperController.groupByCategory)
                    .map(helperController.parseGroup).value();

                if (category) {
                    events = events.filter(help.filterByCategory(category));
                }

                return templates.get('events');
            })
            .then(function (template) {
                $content.html(template(events));


            })
            .catch(function (err) {
                toastr.error(JSON.stringify(err));
            });
    }


    function add(context){
        templates.get('event-add')
            .then(function(template){
                $content.html(template());
                $('#event-date').datepicker();
                $('#event-time').timepicker({  'timeFormat': 'H:i'});
                return data.categories.get();
            })
            .then(function (categories) {
                $('#add-event-button').on('click', function () {
                    var event = {
                        title: $('#event-textbox').val(),
                        category: $('#event-category').val(),
                        description:$('#event-description').val(),
                        date:$('#event-date').val()+' '+$('#event-time').val()
                    };
                    data.events.add(event)
                        .then(function (event) {
                            toastr.success(`Event ${event.title} added!`);
                            context.redirect(`#/events?=${event.category}`);
                        });
                });
                return data.categories.get();
            }).then(function(categories){
                $('#event-category').autocomplete({
                    source: categories
                });
                return data.users.get();
            });
    }

    return{
        all:all,
        add:add
    }
}());