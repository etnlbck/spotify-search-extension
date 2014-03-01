//Add support for lookup as well as search
var memory;
var baseUrl = "http://ws.spotify.com/search/1/artist.json";
  function search (text, cb) {
    $.ajax({
      url: baseUrl+'?q='+text,
      type: 'GET',
      async: true,
      success: function(data, status, jqXHR){
        if(data.artists.length) {
          lookup(data.artists[0].href, cb);
        } else {
          cb([{content:"No Artists Found", description:"Try A New Search."}])
        }
      }

    });

  } 

  function lookup (artist, cb) {
    var finalResult = [];
    var store = {};

    $.ajax({
      url: "http://ws.spotify.com/lookup/1/.json?uri="+artist+"&extras=albumdetail",
      type: 'GET',
      async: true,
      success: function(data, status, jqXHR){
        
        var albums = data['artist'].albums;
        for(var i=0; i < albums.length && i < 5; i +=1) {
          var album = albums[i];
          

          finalResult.push({content:"Artist: "+album.album.artist+" Album: "+album.album.name+" Tracks: ", description:album.album.artist+" "+album.album.name});

        }

        cb(finalResult);
      }

    });    
  }

  function trackList (text) {
    console.log(text);
  }
chrome.omnibox.onInputChanged.addListener(function(text, suggest){   
  
  
    search(text, suggest);  
  
  // $.ajax({
  //   url : baseUrl,
  //   dataType : "json",
  //   type: 'GET',
  //   async: true,
  //   success: function(result){
  //          // console.log(result);
  //     var artists = result['artists'];
  //     for (var i = 0; i < artists.length && i < 5; i += 1){  
  //       var artist = artists[i];
  //       if(artist.href){
  //         var href_split = artist.href.split(":"), 
  //           href = "http://play.spotify.com/artist/" + href_split[2],
  //           obj = {},
  //           artist = artist.name.replace("&", "and");
  //           obj.artist = artist;
  //           obj.url = href;
  //           obj.description = "<match>" +
  //             artist +
  //             "</match>" +
  //             "<dim> - </dim>" + 
  //             " <url>" +
  //             href + 
  //             "</url>";

  //         finalResult.push({
  //           content : obj.artist, 
  //           description : obj.description
  //         });

  //         store[obj.artist.replace(/ /g, "-")] = obj;


  //         // temp store results in memory
  //       }
  //    }
  //    memory = store;
  //    suggest(finalResult);
  //   }      
  // });          
      
});

// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(function(text) {
  if(text.indexOf('Tracks:') >-1) {
    text = text.replace('Tracks:','').replace('Artist:','').replace('Album:','').trim();
    trackList(text);
    // chrome.omnibox.sendSuggestions(2,[{content:text, description:"Testing4"}, {content:text, description:"Testing3"}, {content:text, description:"Testing2"}, {content:text, description:"Testing1"}]);
  }
    // var obj = memory[text.replace(/ /g, "-")];
      
      

    //   $.ajax({url:'http://ws.spotify.com/search/1/track?q='+obj.artist,
    //     dataType:'json',
    //     type:'GET',
    //     async:true,
    //     success:function(result){
          
    //       var finalResult = [],
    //       tracks = result.tracks;
    //       tracks.sort(function(a, b){
    //           if (a.popularity > b.popularity){
    //             return -1;
    //           } else {
    //             return 1;
    //           }
    //          return 1; 
            
    //         });
         
          
    //       $.each(tracks, function(i, k){
    //         var popularity = k.popularity;
    //         var href = k.href.split(':');
            
    //         finalResult.push({popularity:popularity, url:href[2]});

    //       });

    //       var first_url = 'https://play.spotify.com/track/'+finalResult[0].url;
    //       console.log(first_url);
    //       // chrome.omnibox.onInputEntered.addListener(function(text, suggest){

    //       //   suggest()
    //       // });
        
    //       chrome.tabs.update({ url: first_url });
    //     }});
      
    //loop through results find selected then push to local storage
});