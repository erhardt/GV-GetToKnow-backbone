var GVRouter = Backbone.Router.extend({
  
  routes: {
    ":page": "updateCountry",
  },

  viewCountry: function(id){
    console.log("View country requested:" + id);
    this.navigate(id, true); // updates the fragment and triggers the route as well
  },

  updateCountry: function(page){
    if (page != null){
      $('#gv-country').val(page);
      splashView.lookupCountry();
    }
  },
});

var myRouter = new GVRouter();

Backbone.history.start();