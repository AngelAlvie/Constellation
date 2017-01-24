var canvas = document.getElementById('editorCanvas');
var graphics = canvas.getContext( '2d' );
var mouseX = 0;
var mouseY = 0;
//will import font later

var getMouse = function(event) {
  var parentOffset = $('#editorCanvas').offset();
  mouseX = event.pageX - parentOffset.left;
  mouseY = event.pageY - parentOffset.top;
}
/* Creating the classes and objects */

function Star(ID, Title) {
  this.x = Math.random()*canvas.width;
  this.y = Math.random()*canvas.height;
  this.ID = ID;
  this.size = 10;
  this.Title = Title
  this.display = function(graphics) {
    graphics.beginPath();
    graphics.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    graphics.font = "20px Arial";
    graphics.textBaseline="middle";
    graphics.fillText(this.Title,this.x + 13, this.y);
    graphics.fill();
  };
  this.isHovering = function() {
    var dx = (mouseX - this.x)*(mouseX - this.x);
    var dy = (mouseY - this.y)*(mouseY - this.y);
    if (Math.pow((dx + dy) ,.5) < this.size) {
      return true;
    } else {
      return false;
    }
  };
}


function Link(fromStar, toStar) {

  this.display = function(graphics) {

  };
}

function Constellation() {
  this.stars = [new Star(12,"hi")];
  this.links = [];

  this.addStar = function(ID,Title) {
    this.stars.push(new Star(ID,Title));
  };

  this.display = function(graphics) {
    for (var i = 0; i < this.stars.length; i++) {
      this.stars[i].display(graphics);
    }
  };
}
//create constellation instance

var c = new Constellation();

//rendering
function fitToContainer(canvas){
var screenWidth = $('.hidden').width();
var screenHeight = $('.hidden').height()*.7;
$("#editorCanvas").attr('width', screenWidth);
$("#editorCanvas").attr('height', screenHeight);
}

function draw(canvas) {
graphics.fillStyle = '#263238';
  graphics.rect(0,0,canvas.width,canvas.height);
  graphics.fill();
  graphics.fillStyle = "#F5F5F5";
  /*dsiplay current rendering*/
  c.display(graphics);
  graphics.beginPath();
  graphics.arc(mouseX, mouseY, 10, 0, 2*Math.PI);
  graphics.fill();
}



/* first time initialiation */

$(document).ready(function() {
  fitToContainer(canvas);
  draw(canvas);
  $( document ).on( "mousemove", function( event ) {
    getMouse(event);
  });
  $( document ).on( "click", function() {
  });
});
/* run each time window resized*/

$( window ).resize(function() {
  fitToContainer(canvas);
  draw(canvas);
});
var run = function() {
    fitToContainer(canvas);
    draw(canvas);
};

var runTime = setInterval(run,10);
