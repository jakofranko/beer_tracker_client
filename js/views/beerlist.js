var BeerView = Backbone.View.extend({
	tagName: 'li',
	className: 'beer',
	template: _.template($('#beer-list-template').html()),
	events: {
		'click .delete': 'onDelete'
	},
	initialize: function() {
	    this.listenTo(this.model, 'destroy', this.remove);
	},
	render: function() {
	    var html = this.template(this.model.toJSON());
	    this.$el.html(html);
	    return this;
	},
	onDelete: function() {
		this.model.destroy();
	}
});
var BeerListView = Backbone.View.extend({
	el: '#beer-list',
	// Defined in index.html
	initialize: function() {
		this.listenTo(this.collection, 'sync change', this.render);
		this.collection.fetch();
		this.render();
	},
	render: function() {
		var self = this;
		self.$el.empty();
		this.collection.each(function(model) {
			var beer = new BeerView({model: model});
			self.$el.append(beer.render().$el);	
		});
		
		return this;
	}
});