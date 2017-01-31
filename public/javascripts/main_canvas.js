/* THIS IS THE CANVAS WHICH WILL BE RENDERED BEHIND EVERYTHING EXCEPT THE BACKGROUND */

var canvas = document.getElementById('interactiveCanvas')
var ctx = canvas.getContext( '2d' );

var screenWidth = $(window).width();
var screenHeight = $(window).height();
$("canvas").attr('width', screenWidth);
$("canvas").attr('height', screenHeight);

ctx.fillStyle = '#F5F5F5';

var backgroundStar = function() {
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

var screenArea = screenWidth * screenHeight;
var magicCount = screenArea / 5000;

for (var i = 0; i < magicCount; i++) {
  stars.push(new backgroundStar());
}

for (var i = 0; i < stars.length; i++) {
  stars[i].render(ctx);
}

var findRadius = 2700;
var pushRight = screenWidth * .85;
var pushLeft = screenWidth * .15;
var pushTop = screenHeight * .10;
var pushBot = screenHeight * .40;

for (var j = 0; j < stars.length; j++){
  for (var k = 0; k < stars.length; k++){
    if((stars[j].x - stars[k].x)*(stars[j].x - stars[k].x)+(stars[j].y - stars[k].y)*(stars[j].y - stars[k].y)<findRadius &&
    stars[j].z> .9 && stars[k].z > .9 &&
    !(pushRight > stars[j].x && pushLeft < stars[j].x && pushTop < stars[j].y && pushBot > stars[j].y) &&
    !(pushRight > stars[k].x && pushLeft < stars[k].x && pushTop < stars[k].y && pushBot > stars[k].y)){
      ctx.strokeStyle="#F5F5F5";
      ctx.beginPath();
      ctx.moveTo(stars[j].x,stars[j].y);
      ctx.lineTo(stars[k].x,stars[k].y);
      ctx.stroke();
    }
  }
}
