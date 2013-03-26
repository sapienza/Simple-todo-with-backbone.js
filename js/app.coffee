$ ->
 
    class TodoModel extends Backbone.Model
        defaults: ->
            id: null
            item: null

    class TodoCollection extends Backbone.Collection
        model: TodoModel

    class TodoView extends Backbone.View

        el: $ '#tasks'
        itemField: $ '#new_task'
        collection: new TodoCollection()        

        initialize: ->
            @.el = $ @.el

        events: 
            'submit form': 'addItem'
            'click .remove-item': 'removeItem'

        template: $('#task_template').html()

        render: (id,item) ->
            template = _.template(@.template)
            id = @.el.children('ul').append(template({id: id,item: item}))

        addItem: (e) ->
            e.preventDefault()
            item = @.itemField.val()
            #console.log(item)
            id = _.uniqueId('todo_')
            #Call render
            @.render(id,item)
            #Clear field
            @.itemField.val('')
            @.itemField.focus()
            #Add to collection
            newItem = new TodoModel
                id: id,
                item: item
            
            @.collection.add(newItem);

        removeItem: (e) -> 
            thisid = @.$(e.currentTarget).parent('li').data("id")
            thisitem = @.collection.get(thisid)
            @.collection.remove(thisitem)
            #Remove from DOM
            $(e.target).parent('li').remove()
        
    todoApp = new TodoView 
        collection: new TodoCollection()

   
        