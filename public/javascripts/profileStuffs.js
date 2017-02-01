var prevPage = window.history.back(1);
var resize = function() {
  var screenWidth = $(window).width();
  var screenHeight = $(window).height();
  var breakpoints = [768, 992, 1170];           //xs, sm, md, lg
  var hiddenWidth = 0;
  var hiddenHeight = 200;
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
  $(".hidden").css("height", tmp[1] - 50);
  $(".hidden").animate({height: tmp[1]}, 600);

  $(".bump").click(function(e){
      e.preventDefault()
        if (window.location.href.includes("/myConstellations")) {
          console.log($(this));
          console.log($(this).parent());
          console.log($(this).parent().parent().attr("href"));
          console.log($(this).parent().parent().attr("href").slice(-24));
          if (confirm("Are you sure you want to delete this constellation forever?")) {
            $.ajax({
              url : "/deleteConstellation/" + $(this).parent().parent().attr("href").slice(-24),
              method: "GET",
              success : function( data ) {
                location.reload();
              },
              error : function() {
                console.log("failure to delete constellation");
              }
            });
          }
        } else if (window.location.href.includes("/myStars")) {
          console.log($(this));
          console.log($(this).parent());
          console.log($(this).parent().parent().attr("href"));
          console.log($(this).parent().parent().attr("href").slice(-24));
          if (confirm("Are you sure you want to delete this star forever?")) {
            $.ajax({
              url : "/deleteStar/" + $(this).parent().parent().attr("href").slice(-24),
              method: "GET",
              success : function( data ) {
                location.reload();
              },
              error : function() {
                console.log("failure to delete star");}
            });
          }
        } else if (window.location.href.includes("/savedStars")){
          $.ajax({
            method: "POST",
            url: "/bookmarkStar",
            data: { id:  $(this).parent().parent().attr("href").slice(-24)},
            success: function(data) {
              console.log("Success! Bookmark saved" + data);
                location.reload();
            },
            error: function(err) {
              console.log("Error on retrieving data from the server: " + err);
            }
          });
        } else {
          $.ajax({
            method: "POST",
            url: "/bookmarkConstellation",
            data: { id:  $(this).parent().parent().attr("href").slice(-24)},
            success: function(data) {
              console.log("Success! Bookmark saved" + data);
                location.reload();
            },
            error: function(err) {
              console.log("Error on retrieving data from the server: " + err);
            }
          });
        }
  });
});

$( window ).resize(function() {

  var tmp = resize();
  $(".hidden").stop(true).animate({width: tmp[0], height: tmp[1]}, 200);
});


/* Button Handlers */

var backClicked = function() {window.location.href = prevPage;
};

var nebulaStarClicked = function() {
  window.location.assign('/nebula/star');
};

var nebulaConstellationClicked = function(){
  window.location.assign('/nebula/constellation');
};
