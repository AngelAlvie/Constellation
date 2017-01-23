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
  $(".hidden").css("height", 0);
  $(".hidden").animate({height: tmp[1]}, 600);
});

$( window ).resize(function() {
  var tmp = resize();
  $(".hidden").stop(true).animate({width: tmp[0], height: tmp[1]}, 200);
});

/* Button Handlers */

var back = function() {
  window.location.href = '/search/star';
};

var bookmark = function() {
  var currentUrl = window.location.href;
  console.log(currentUrl);
  var ID = currentUrl.slice(-24);
  console.log(ID);
  $.ajax({
    method: "POST",
    url: "/bookmarkStar",
    data: { id:  ID}
  });
};
