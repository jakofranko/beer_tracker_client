var beers = new BeerCollection();
var beerList = new BeerListView({collection: beers});
var addBeer = new AddBeerView({collection: beers});
beers.fetch();