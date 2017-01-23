/* THIS IS THE CANVAS WHICH WILL BE RENDERED BEHIND EVERYTHING EXCEPT THE BACKGROUND */

var canvas = document.getElementById('interactiveCanvas')
var ctx = canvas.getContext( '2d' );

var screenWidth = $(window).width();
var screenHeight = $(window).height();
$("canvas").attr('width', screenWidth);
$("canvas").attr('height', screenHeight);

ctx.fillStyle = 'white';

var Star = function() {
  this.x = Math.floor(Math.random()*screenWidth);
  this.y = Math.floor(Math.random()*screenHeight*.75);
  this.z =Math.floor(Math.random()*5);

  this.render = function(ctx) {
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.z,0,2*Math.PI);
    ctx.fill();
  };
};

var stars = [];

for (var i = 0; i < 100; i++) {
  stars.push(new Star());
}

for (var i = 0; i < stars.length; i++) {
  stars[i].render(ctx);
}
