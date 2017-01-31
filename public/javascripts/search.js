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
  if (constellationIsClicked) {
    $('form').attr('action', '/search/constellation');
  } else {
    $('form').attr('action', '/search/star');
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

/* Button handlers */

var telescopeClicked= function() {
  $( "form" ).submit();
};


function renderPage(pageurl) {
  window.location.href = pageurl;
}

var fromDataHtml = function(data) {
  var htmlString = "";
  for (var i = 0; i < data.length; i++) {
    htmlString = htmlString + "<div class = 'searchResult' onclick='renderPage(\"" + data[i].Url + "\");'><h3>" + data[i].Title + "</h3><p>" + data[i].Description + "</p></div>";
  }
  if (htmlString === '' ) {
    htmlString = '<div class="searchResult"><h3>Sorry, no results found.</h3><p>Perhaps try a less specific or search for something else.</p></div>';
  }
  return htmlString;
};
var fromDataHtmlConstellation = function(data) {
  var htmlString = "";
  for (var i = 0; i < data.length; i++) {
    htmlString = htmlString + "<div class = 'searchResult' onclick='renderPage(\"" + data[i].Url + "\");'><h3>" + data[i].Title + "</h3><p>" + data[i].Description + "</p></div>";
  }
  if (htmlString === '' ) {
    htmlString = '<div class="searchResult"><h3>Sorry, no results found.</h3><p>Perhaps try a less specific or search for something else.</p></div>';
  }
  return htmlString;
};
$("#search").on('submit', function(event) {
  event.preventDefault();
  if (starIsClicked){
    $.ajax({
      url : "/search/stars",
      data : {search: $("input").val()},
      method: "POST",
      success : function( data ) {
        inner = fromDataHtml(data);
        $(".results").html(inner);
      },
      error : function() {}
    });
  } else {
    $.ajax({
      url : "/search/constellations",
      data : {search: $("input").val()},
      method: "POST",
      success : function( data ) {
        inner = fromDataHtmlConstellation(data);
        $(".results").html(inner);
      },
      error : function() {}
    });
  }
});

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

var signInClicked = function() {
  window.location.href = '/signin'
};

var signUpClicked = function() {
  window.location.href = '/signUp';
};
var profileClicked = function() {
  window.location.href = '/profile';
};
var signOutClicked = function() {
  window.location.href = '/signOut';
}
