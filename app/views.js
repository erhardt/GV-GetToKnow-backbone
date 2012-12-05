var splashView; // HACK: needs to be global so template can access country data
var currentCounts; // HACK: need global access to country count model

(function($){

var SplashView = Backbone.View.extend({

    events: {
      "change #gv-country":    "initLookupCountry",
    },
    
    initialize: function(){
        this.loadCountryData();
        this.render();
        currentCounts = new Counts;
    },
     
    // render the whole app
    render: function(){
        $(this.el).load("templates/app.template");
    },
    
    // load up the list of GV countries and urls
    loadCountryData: function(){
        var that = this;
        jQuery.getJSON("data/countries.json", function(data){
            that.countryToPath = data;
        });
    },
    
    initLookupCountry: function(){
        var currentCountry = $('#gv-country').val();
        myRouter.viewCountry(currentCountry);
    },

    // if the country is a valid one, update the map and content
    lookupCountry: function(currentCountry){
        if (_.has(this.countryToPath,currentCountry) ){
            rssUrl = "http://globalvoicesonline.org"+this.countryToPath[currentCountry]+"feed";
            $('#gv-country').attr('disabled', 'disabled');
            $('.gv-story').hide();
            $('#search-count').hide();
            $('#gv-loading').show();
            this.updateGlobalVoicesContent(rssUrl);
            this.updateBackgroundMap(currentCountry);
            this.countryCounter(currentCountry);
        }
    },

    // adds to database of counts per country stored in data/counts.json and displays number next to search box
    countryCounter: function(currentCountry){
        var that = this;

        // NEED TO ADD SERVER FOR FUNCTIONALITY

        currentCounts.set(currentCountry, currentCounts.get(currentCountry)+1);
        console.log("got data");

        $('#search-count').html("Total searches for " + currentCountry + ": " + currentCounts.get(currentCountry));
        $('#search-count').show();
    },

    // fetch the latest content from the country's RSS feed
    updateGlobalVoicesContent: function(rssUrl){
        var that = this;
        $.ajax({
            url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(rssUrl),
            dataType: 'json',
            success: function(data) {
                stories = _.first(data.responseData.feed.entries,6);
                $('#gv-country').attr('disabled', false);
                that.updateOneStory(stories[0], '#gv-story-1');
                that.updateOneStory(stories[1], '#gv-story-2');
                that.updateOneStory(stories[2], '#gv-story-3');
                that.updateOneStory(stories[3], '#gv-story-4');
                that.updateOneStory(stories[4], '#gv-story-5');
                that.updateOneStory(stories[5], '#gv-story-6');
                $('#gv-loading').hide();
                $('.gv-story').show();
            }
        });
    },

    // update the teaser for one story
    updateOneStory:function(story, dest){
        $(dest).empty();
        $.ajax({url:"templates/story.template", 
              type: "GET",
              dataType: "text",
              success: function(content){
                $(dest).html(_.template(content, {
                    link: story.link,
                    title: story.title, 
                    author: story.author, 
                    contentSnippet: story.contentSnippet
                    }));
            }});
    },

    // update the background map (centered on the country)
    updateBackgroundMap:function(country){
         $.ajax({
            url: 'http://maps.googleapis.com/maps/api/geocode/json?address='+encodeURIComponent(country)+'&sensor=false',
            dataType: 'json',
            success: function(data) {
                var loc = data.results[0].geometry.location;
                var mapUrl = "http://maps.stamen.com/watercolor/embed#3/"+loc.lat+"/"+loc.lng;
                $('#gv-map').attr('src',mapUrl);
            }
          });
    }
    

});

splashView = new SplashView;

// kick off the app!
$("#app").html(splashView.el);

})(jQuery);
