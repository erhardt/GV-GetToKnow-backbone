var GVRouter = Backbone.Router.extend({
  
  routes: {
    ":page": "updateCountry",
    "*path": "resetIndex",
  },

  viewCountry: function(id){
    this.navigate(id, true); // updates the fragment and triggers the route as well
  },

  updateCountry: function(page){
    console.log("Country requested: " + page);
    $('#gv-country').val(page);
    splashView.lookupCountry(page);
  },

  resetIndex: function(path){
    console.log("Reset page to index");
    $('#gv-country').val("");
    splashView.initialize();
  },
});

var myRouter = new GVRouter();

Backbone.history.start();