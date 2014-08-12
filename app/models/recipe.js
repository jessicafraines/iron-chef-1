'use strict';

var Mongo = require('mongodb');

function Recipe(o){
  this.name         = o.name;
  this.photo        = o.photo;
  this.directions   = o.directions;
  this.ingredients  = o.ingredients.split(',').map(function(i){return i.trim();});
  this.created      = new Date();
  this.category     = o.category;
}

Object.defineProperty(Recipe, 'collection', {
  get: function(){return global.mongodb.collection('recipes');}
});

Recipe.all = function(cb){
  Recipe.collection.find().sort({created:-1}).toArray(cb);
};

Recipe.create = function(o, cb){
  var r = new Recipe(o);
  r.name = r.name.length ? r.name : 'food';
  r.photo = r.photo.length ? r.photo : '/img/food.jpg';
  r.directions = r.directions.length ? r.directions : 'cook food';
  r.ingredients = r.ingredients[0].length ? r.ingredients : ['McDonalds', 'Tonight'];
  r.category = r.category.length ? r.category : 'anytime';
  Recipe.collection.save(r, cb);
};

Recipe.deleteById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Recipe.collection.findAndRemove({_id:_id}, cb);
};

module.exports = Recipe;

