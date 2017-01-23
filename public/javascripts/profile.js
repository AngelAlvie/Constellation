
var resize = function() {
  var screenWidth = $(window).width();
  var screenHeight = $(window).height();
  var breakpoints = [768, 992, 1170];           //xs, sm, md, lg
  var hiddenWidth = 0;
  var hiddenHeight = 200;
  if ( screenWidth < breakpoints[0] ) {         // extra small screen
    hiddenWidth = screenWidth * 0.9;
    hiddenHeight = screenHeight*0.6;
  } else if ( screenWidth < breakpoints[1] ) {  // small screen
    hiddenWidth = screenWidth * 0.75;
    hiddenHeight = screenHeight*0.55;
  } else if ( screenWidth < breakpoints[2] ) {  // medium
    hiddenWidth = screenWidth * 0.6;
    hiddenHeight = screenHeight*0.5;
  } else {                                      // large
    hiddenWidth = screenWidth * 0.45;
    hiddenHeight = screenHeight*0.45;
  }
  return [hiddenWidth, hiddenHeight];
};

$(document).ready(function() {
  var tmp = resize();
  $(".hidden").css("width",  tmp[0]);
  $(".hidden").css("height", 0);
  $(".hidden").animate({height: tmp[1]}, 600);
  renderClickedButtons();
});

$( window ).resize(function() {

  var tmp = resize();
  $(".hidden").stop(true).animate({width: tmp[0], height: tmp[1]}, 200);
});

/* Button Handlers */

var backClicked = function() {
  window.location.assign('/search/star');
};

var nebulaClicked = function() {
  window.location.assign('/nebula');
};

var myConstellationsClicked = function() {
  window.location.assign('/myConstellations');
};

var myStarsClicked = function() {
  window.location.assign('/myStars');
};

var savedConstellationsClicked = function() {
  window.location.assign('/savedConstellations');
};

var savedStarsClicked = function() {
  window.location.assign('/savedStars');
};
