var prevPage = window.history.back(1);
//Page Resizing
var resize = function() {
  var screenWidth = $(window).width();
  var screenHeight = $(window).height();
  var breakpoints = [768, 992, 1170];           //xs, sm, md, lg
  var hiddenWidth = 0;
  var hiddenHeight = 200;
  if ( screenWidth < breakpoints[0] ) {         // extra small screen
    hiddenWidth = screenWidth;
    hiddenHeight = screenHeight*0.9;
  } else if ( screenWidth < breakpoints[1] ) {  // small screen
    hiddenWidth = screenWidth * 0.9;
    hiddenHeight = screenHeight *0.9;
  } else if ( screenWidth < breakpoints[2] ) {  // medium
    hiddenWidth = screenWidth * 0.8;
    hiddenHeight = screenHeight*0.9;
  } else {                                      // large
    hiddenWidth = screenWidth * 0.7;
    hiddenHeight = screenHeight*0.9;
  }
  return [hiddenWidth, hiddenHeight];
};

$(document).ready(function() {
  var tmp = resize();
  $(".hidden").css("width",  tmp[0]);
  $(".hidden").animate({height: tmp[1]}, 600);
  checkBookmark();
});

$( window ).resize(function() {
  var tmp = resize();
  $(".hidden").stop(true).animate({width: tmp[0], height: tmp[1]}, 200);
});

/* Button Handlers */

var back = function() {
  window.location.href = prevPage;
};

function checkBookmark() {
  var currentUrl = window.location.href;
  var ID = currentUrl.slice(-24);
  $.ajax({
    method: "POST",
    url: "/isConstellationBookmarked",
    data: { id:  ID},
    success: function(data) {
      if (data === "bookmarked") {
        $("#bookmark").css("background-color", '#78909c');
      } else {
        $("#bookmark").css("background-color", '#263238');
      }
    },
    error: function(err) {
      $("#bookmark").css("background-color", '#263238');
    }
  });
}

var bookmarkConstellation = function() {
  var currentUrl = window.location.href;
  console.log(currentUrl);
  var ID = currentUrl.slice(-24);
  console.log(ID);
  $.ajax({
    method: "POST",
    url: "/bookmarkConstellation",
    data: { id:  ID},
    success: function(data) {
      console.log("Success! Bookmark saved" + data);
      checkBookmark();
    },
    error: function(err) {
      console.log("Error on retrieving data from the server: " + err);
      checkBookmark();
    }
  });
};
