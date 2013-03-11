
chrome.omnibox.onInputChanged.addListener(
    function(text, suggest){
       
       var baseUrl = "http://ws.spotify.com/search/1/track.json?q="+text;
       var finalResult = [];
      
              $.ajax({
                     url : baseUrl,
                     dataType : "json",
                     type: 'GET',
                     success: function(result){
                      console.log(result);
                     var track = result['tracks'];
                                     for (var i=0; i<track.length; i++){  
                                          var href_split = track[i].href.split(":"), href = "http://play.spotify.com/track/"+href_split[2];
                                          finalResult.push(
                                                 {content : track[i].name+" - "+track[i]['artists'][0].name+" - "+href, description : track[i].name+" - "+track[i]['artists'][0].name+" - "+href}
                                          );
                                     }
                                     suggest(finalResult);
                      },
                      async:false
                     
              });          
      
  }
  );

// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(
  function(text) {
    var href_split = text.split(" - ");
    chrome.tabs.update({ url: href_split[2] });
  });