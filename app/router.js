var GVRouter = Backbone.Router.extend({
  
  routes: {
    ":page": "updateCountry",
    "*path": "resetIndex",
  },

  viewCountry: function(id){
    console.log("View country requested: " + id);
    this.navigate(id, true); // updates the fragment and triggers the route as well
  },

  updateCountry: function(page){
    console.log("Returning to country: " + page);
    $('#gv-country').val(page);
    splashView.lookupCountry();
  },

  resetIndex: function(path){
    console.log("Reset page to index");
    $('#gv-country').val("");
    splashView.initialize();
  },
});

var myRouter = new GVRouter();

Backbone.history.start();