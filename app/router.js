var GVRouter = Backbone.Router.extend({
  
  routes: {
    "country/:id": "viewCountry",
  },

  viewCountry: function(id){
    console.log("View country requested.");
    this.navigate(id, true); // updates the fragment and triggers the route as well
  },
});

var myRouter = new GVRouter();

Backbone.history.start();