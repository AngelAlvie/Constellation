
var editorIsClicked = true;

var searchIsClicked = false;

var renderClickedButtons = function() {
  if (editorIsClicked) {
    $("#search").css("background-color", '#78909c');
  } else {
    $("#constellation").css("background-color", '#263238');
  }
  if (searchIsClicked) {
    $("#star").css("background-color", '#78909c');
  } else {
    $("#star").css("background-color", '#263238');
  }
}

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
  var $bodytag = $('html, body');
  var sections = ['editor', 'search'];
  sections.forEach(function (section) {
      $('.goto-'+section).click(function (e) {
          $bodytag.animate({
              scrollTop: $('#'+section).offset().top
          }, 400);
      });
  });

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


var editorClicked = function() {
  if (searchIsClicked) {
    searchIsClicked = false;
    editorIsClicked = true;
  } else {
    editorIsClicked = true;
  }
  renderClickedButtons();
};

var searchClicked = function() {
  if (editorIsClicked) {
    editorIsClicked = false;
    searchIsClicked = true;
  } else {
    searchIsClicked = true;
  }
  renderClickedButtons();
};

/* Button Handlers */

var back = function() {
  window.location.href = '/myStars';
}
