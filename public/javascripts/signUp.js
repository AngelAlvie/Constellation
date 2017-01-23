/* Rendering for the page */

// make screen break points for width and height independent of each other

var resize = function() {
  var screenWidth = $(window).width();
  var screenHeight = $(window).height();
  var breakpoints = [768, 992, 1170];           //xs, sm, md, lg
  var hiddenWidth = 0;
  var hiddenHeight = 200;
  if ( screenWidth < breakpoints[0] ) {         // extra small screen
    hiddenWidth = screenWidth * 0.9;
    hiddenHeight = screenHeight * 0.65;
  } else if ( screenWidth < breakpoints[1] ) {  // small screen
    hiddenWidth = screenWidth * 0.75;
    hiddenHeight = screenHeight * 0.60;
  } else if ( screenWidth < breakpoints[2] ) {  // medium
    hiddenWidth = screenWidth * 0.6;
    hiddenHeight = screenHeight * 0.50;
  } else {                                      // large
    hiddenWidth = screenWidth * 0.45;
    hiddenHeight = screenHeight * 0.45;
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
  window.location.href = '/';
}

var yesPlease = function() {
  window.location.assign('/constellation');
}

var noThanks = function() {
  window.location.assign('/');
}
