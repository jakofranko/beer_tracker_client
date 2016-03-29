var beers = new BeerCollection();
var beerList = new BeerListView({collection: beers});
var addBeer = new AddBeerView();
beers.fetch().then(function() {
	beers.each(function(beer) {
		console.log(beer.toJSON());
	});
});