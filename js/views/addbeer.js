var IngredientView = Backbone.View.extend({
	tagName: 'div',
	template: _.template($('#add-beer-template').html()),
	render: function(value) {
		var ingredientCount = $('.ingredient').length;
		var html = this.template({index: ingredientCount, value: value});
		this.$el.html(html);
		return this;
	}
});
var AddBeerView = Backbone.View.extend({
	el: '#add-beer',
	events: {
		'change .name': 'onChangeName',
		'change .type': 'onChangeType',
		'click .allergic': 'onClickAllergic',
		'change .ingredient': 'onChangeIngredient',
		'click .add-ingredient': 'onClickAddIngredient',
		'click .remove-ingredient': 'onClickRemoveIngredient',
		'click .save': 'onSave'
	},
	initialize: function() {
		// Clear out any old DOM elements
		this.$el.find('.save').remove();
		this.$el.find('.ingredients').empty();

		this.model = new BeerModel();
		var ingredient = new IngredientView().render();
		var save = document.createElement('button');
		var text = document.createTextNode('Add Beer');

		save.appendChild(text);
		save.className = 'save';

		this.$('.ingredients').append(ingredient.$el.html());
		this.$el.append(save);
	},
	render: function() {
		var ingredients = $('.ingredient');
		var self = this;
		if(ingredients.length > 0) {
			var values = [];
			// grab the existing ingredients, remove that ingredient from the DOM,
			// then re-render them in order to get a new count
			ingredients.each(function(i, el) {
				var value = $(el).val();
				values.push(value);
				$(el).parents('.ingredient-row').remove();
			});

			values.forEach(function(val) {
				var ingredient = new IngredientView().render(val);
				self.$('.ingredients').append(ingredient.$el.html());
			});
		} else {
			var ingredient = new IngredientView().render();
			this.$('.ingredients').append(ingredient.$el.html());
		}
	},
	onChangeName: function(e) {
		this.model.set('name', e.currentTarget.value);
	},
	onChangeType: function(e) {
		this.model.set('type', e.currentTarget.value);
	},
	onClickAllergic: function(e) {
		console.log(e.currentTarget.value);
		var allergic = e.currentTarget.value === "on" ? true : false;
		this.model.set('allergic', allergic);
	},
	onChangeIngredient: function(e) {
		var ingredients = [];
		$('.ingredient').each(function(i, el) {
			ingredients.push($(el).val());
		});
		this.model.set('ingredients', ingredients);
		console.log(this.model.attributes);
	},
	onClickAddIngredient: function(e) {
		var ingredient = new IngredientView().render();
		this.$('.ingredients').append(ingredient.$el.html());
		console.log(e.currentTarget);
	},
	onClickRemoveIngredient: function(e) {
		$(e.currentTarget).parents('.ingredient-row').remove();
		this.render();
		this.onChangeIngredient();
	},
	onSave: function(e) {
		this.collection.create(this.model.toJSON());
		this.$el.find('.name')
			.add('.allergic')
			.add('.ingredient')
			.val(null)
			.prop('checked', false);

		this.initialize();
	},
});