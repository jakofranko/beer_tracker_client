var BeerModel = Backbone.Model.extend({
	defaults: {
		name: null,
		allergic: false,
		ingredients: []
	}
});

var BeerCollection = Backbone.Collection.extend({
	url: 'http://localhost:3000/beer',
	model: BeerModel
});