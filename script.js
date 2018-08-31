alert("Warning: Getting ready to search...")
$(document).ready(function() { // Starting up the jQuery
  // Calling the class of the word form but targeting the actual sumbit button or the "search" 
  $('.form').submit(function(){
    $('#res').html(" "); // as well as calling the id of response but in shorter terms "res", so it would allow it to sumbit a word in the search
    callWikipedia();
    return false;
  });
  // And from the from this allows it to search and a fucntion is call for it, "callWikipedia()" which is the actaul API used for the Wiki
  $('#search').click(function(){
    $('#res').html(" ");
    callWikipedia();
  });
  function callWikipedia(){ // Calling API
    var q = $('#query').val(); // Allows to commit searches related to the users word
    var url = "https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="+q+"&callback=?";
    $.getJSON({ // As well as using the Ajax call towards the Wikipedia API
      url:url,
      type: 'POST', // is a HTTP Method (just like the get request, used in the Weather API)  it supplies extra data from the browser itself to the server in the message body.
      dataType: 'jsonp',
      success: function(result){ /* Once its readable in the console (Inspect Elements in Google chrome) a method should be made in which 
      once the console is able to identify the API a variable should be placed with the data that shows different searches and from there can another function the renders it */
        var data = result.query.pages;
        render(data);
      },
    });
  }
   //Once results appear and clicked on, it's all traced back to the Wiki and the links for each results opens to a new tab in the actual wikipedia
  function render(data){
    var pageurl="http://en.wikipedia.org/?curid=";
    for(var i in data){
      $('#res').append("<div id='resultdiv'><a target='_blank' href='"+pageurl+data[i].pageid+"'><h3>"+data[i].title+"</h3><p>"+data[i].extract+"</p></a></div>");
    }
  }
});