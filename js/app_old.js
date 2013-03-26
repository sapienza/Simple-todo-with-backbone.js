$(function(){

    var TodoModel = Backbone.Model.extend({
        defaults: {
            id: null,
            item: null
        }
    });

    var TodoCollection = Backbone.Collection.extend({
        model: TodoModel
    });

    var TodoView = Backbone.View.extend({

        el: $('#tasks'),

        itemField: $('#new_task'),

        initialize: function(){
            this.el = $(this.el);
        },

        events: {
            'submit form': 'addItem',
            'click .remove-item': 'removeItem',
        },

        template: $('#task_template').html(),

        render: function(id,item) {
            var template = _.template(this.template);
            var id = 
            this.el.children('ul').append(template({id: id,item: item}));
        },

        addItem: function(e) {
            e.preventDefault();
            item = this.itemField.val();
            id = _.uniqueId('task_');
            // Call render
            this.render(id,item);
            // Clear field
            this.itemField
                .val('')
                .focus();
            // Add to collection
            var newItem = new TodoModel({
                id: id,
                item: item
            });
            this.collection.add(newItem);
        },

        removeItem: function(e) {
            var thisid = this.$(e.currentTarget).parent('li').data("id");
            var this_item = this.collection.get(thisid);
            this.collection.remove(this_item);
            // Remove from DOM
            $(e.target).parent('li').remove();
        }

    });

    todoApp = new TodoView({collection: new TodoCollection()});

});