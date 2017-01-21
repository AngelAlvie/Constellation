/* Global variables */

var constellationIsClicked = false;
var starIsClicked = true;

var renderClickedButtons = function() {
  if (constellationIsClicked) {
    $("#constellation").css("background-color", '#78909c');
  } else {
    $("#constellation").css("background-color", '#263238');
  }
  if (starIsClicked) {
    $("#star").css("background-color", '#78909c');
  } else {
    $("#star").css("background-color", '#263238');
  }
}

/* Rendering for the page */

var resize = function() {
  var screenWidth = $(window).width();
  var screenHeight = $(window).height();
  var breakpoints = [768, 992, 1170];           //xs, sm, md, lg
  var hiddenWidth = 0;
  var hiddenHeight = 0;
  if ( screenWidth < breakpoints[0] ) {         //extra small screen
    hiddenWidth = screenWidth * 0.9;
    hiddenHeight = screenHeight * 0.9;
  } else if ( screenWidth < breakpoints[1] ) {  // small screen
    hiddenWidth = screenWidth * 0.75;
    hiddenHeight = screenHeight * 0.9;
  } else if ( screenWidth < breakpoints[2] ) {  // medium
    hiddenWidth = screenWidth * .6;
    hiddenHeight = screenHeight * 0.9;
  } else {                                     // large
    hiddenWidth = screenWidth * .45;
    hiddenHeight = screenHeight * 0.9;
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

/* Event handlers */

var telescopeClicked= function() {
  $( "form" ).submit();
};

var constellationClicked = function() {
  if (starIsClicked) {
    starIsClicked = false;
    constellationIsClicked = true;
  } else {
    constellationIsClicked = true;
  }
  renderClickedButtons();
};

var starClicked = function() {
  if (constellationIsClicked) {
    constellationIsClicked = false;
    starIsClicked = true;
  } else {
    starIsClicked = true;
  }
  renderClickedButtons();
};
var profileClicked = function() {
};

var back = function() {
  window.location.assign('/');
}
