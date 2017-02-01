
var editorIsClicked = true;

var searchIsClicked = false;

var renderClickedButtons = function() {
  if (editorIsClicked) {
    $(".goto-editor").css("background-color", '#78909c');
  } else {
    $(".goto-editor").css("background-color", '#263238');
  }
  if (searchIsClicked) {
    $(".goto-search").css("background-color", '#78909c');
  } else {
    $(".goto-search").css("background-color", '#263238');
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
    console.log("for happening");
      $('.goto-'+section).click(function (e) {
        console.log("click events happening");
          $bodytag.animate({
              scrollTop: $('#'+section).offset().top
          }, 300);
      });
  });
  var tmp = resize();
  $(".hidden").css("width",  tmp[0]);
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

var backStar = function() {window.location.href = window.history.back(1);
}
var backConstellation = function() {window.location.href = window.history.back(1);
}
