google.load('search', '1');

var imageSearch;

function searchComplete() {

// Check that we got results
if (imageSearch.results && imageSearch.results.length > 0) {

  // Grab our content div, clear it.
  var contentDiv = document.getElementById('content');
  contentDiv.innerHTML = '';

  // Loop through our results, printing them to the page.
  var results = imageSearch.results;
  for (var i = 0; i < results.length; i++) {
    // For each result write it's title and image to the screen
    var result = results[i];
    var imgContainer = document.createElement('col-md-4');
    var newImg = document.createElement('img');

    // There is also a result.url property which has the escaped version
    newImg.src=result.tbUrl;
    imgContainer.appendChild(newImg);

    // Put our title + image in the content
    contentDiv.appendChild(imgContainer);
  }
}
}
function searchImage(image) {
    // Create an Image Search instance.
    imageSearch = new google.search.ImageSearch();

    // Set searchComplete as the callback function when a search is 
    // complete.  The imageSearch object will have results in it.
    imageSearch.setSearchCompleteCallback(this, searchComplete, null);

    // Find me a beautiful car.
    imageSearch.execute(image+ "Spirit");

    // Include the required Google branding
    google.search.Search.getBranding('branding');

}

function OnLoad() {
    $('#animalButton').css("visibility", "visible"); 
}
google.setOnLoadCallback(OnLoad);
