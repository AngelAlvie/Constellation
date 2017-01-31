// submit AJAX request to /constellationdata/:ID , then take that data and turn it into a viewable canvas object

var c = new Constellation();
var canvasGraph;
var canvasStars;
var canvas = document.getElementById('viewCanvas');
var graphics = canvas.getContext( '2d' );
var mouseX = 0;
var mouseY = 0;
var prevMouseX = 0;
var prevMouseY = 0;
var mouseDragRadius = 0.1;
var screenWidth = $('.hidden').width();
var screenHeight = $('.hidden').height()*.7;
var isDragging = false;
var currentOffset = 0;
//will import font later

function dashedLine(x, y, x2, y2, start, graphics) {
        var dashArray = [10, 5];
        var dashCount = dashArray.length;
        var dashSize = 0;
        for (i = 0; i < dashCount; i++) dashSize += parseInt(dashArray[i]);
        var dx = (x2 - x),
            dy = (y2 - y);
        var slopex = (dy < dx);
        var slope = (slopex) ? dy / dx : dx / dy;
        var dashOffSet = dashSize * (1 - (start / 100))
        if (slopex) {
          if (dx < 0) {
          var xOffsetStep = -Math.sqrt(dashOffSet * dashOffSet / (1 + slope * slope));
          } else {
          var xOffsetStep = Math.sqrt(dashOffSet * dashOffSet / (1 + slope * slope));
          }
            x -= xOffsetStep;
            dx += xOffsetStep;
            y -= slope * xOffsetStep;
            dy += slope * xOffsetStep;
        } else {
          if (dy < 0) {
          var yOffsetStep = -Math.sqrt(dashOffSet * dashOffSet / (1 + slope * slope));
          } else {
          var yOffsetStep = Math.sqrt(dashOffSet * dashOffSet / (1 + slope * slope));
          }
            y -= yOffsetStep;
            dy += yOffsetStep;
            x -= slope * yOffsetStep;
            dx += slope * yOffsetStep;
        }
        graphics.moveTo(x, y);
        var distRemaining = Math.sqrt(dx * dx + dy * dy);
        var dashIndex = 0, draw = true;
        while (distRemaining >= 0.1 && dashIndex < 10000) {
            var dashLength = dashArray[dashIndex++ % dashCount];
            if (dashLength > distRemaining) dashLength = distRemaining;
            if (slopex) {
              if (dx <= 0) {
                  var xStep = -Math.sqrt(dashLength * dashLength / (1 + slope * slope));
              } else {
                  var xStep = Math.sqrt(dashLength * dashLength / (1 + slope * slope));
              }
                x += xStep
                y += slope * xStep;
            } else {
              if (dy <= 0) {
                var yStep = -Math.sqrt(dashLength * dashLength / (1 + slope * slope));
              } else {
                var yStep = Math.sqrt(dashLength * dashLength / (1 + slope * slope));
              }
                y += yStep
                x += slope * yStep;
            }
            if (dashOffSet > 0) {
                dashOffSet -= dashLength;
                graphics.moveTo(x, y);
            } else {
                graphics[draw ? 'lineTo' : 'moveTo'](x, y);
            }
            distRemaining -= dashLength;
            draw = !draw;
        }
        // Ensure that the last segment is closed for proper stroking
        graphics.moveTo(0, 0);
    }


$(document).ready(function() {
  getData();
});

function getData() {
  var currentUrl = window.location.href;
  var constellationID = currentUrl.slice(-24);
  $.ajax({
    url : "/constellationData/" + constellationID,
    method: "GET",
    success : function( data ) {
      canvasGraph = data.graph;
      for (var i = 0; i < canvasGraph.length; i++) {
        if (canvasGraph[i][0] === -1) {
          canvasGraph[i] = [];
        }
      }
      canvasStars = data.stars;
      console.log(canvasStars);
      console.log(canvasGraph);
      for (var i = 0; i < canvasStars.length; i++) {
        c.addStar(canvasStars[i].ID, canvasStars[i].Title, canvasStars[i].x, canvasStars[i].y);
          console.log("added a star");
          console.log(c.stars[i]);
      }
      c.links = canvasGraph;
      console.log("links:");
      console.log(c.links);
      console.log("stars:")
      console.log(c.stars);
    },
    error : function(err) {
      console.log("Error retrieving from the server: " + err);
    }
  });
}

var getMouse = function(event) {
  var parentOffset = $('#viewCanvas').offset();
  mouseX = event.pageX - parentOffset.left;
  mouseY = event.pageY - parentOffset.top;
}
/* Creating the classes and objects */

function Star(ID, Title, x, y) {
  this.x = x;
  this.y = y;
  this.ID = ID;
  this.size = 10;
  this.Title = Title;
  this.display = function(graphics) {
    graphics.beginPath();
    graphics.arc(this.x, this.y, this.size, 0, 2*Math.PI);
    graphics.fill();
  };
  this.isHovering = function() {
    var dx = (mouseX - this.x)*(mouseX - this.x);
    var dy = (mouseY - this.y)*(mouseY - this.y);
    if (Math.pow((dx + dy) ,.5) < this.size + 15) {
      return true;
    } else {
      return false;
    }
  };
}

function Constellation() {
  this.stars = [];
  this.links = [];
  this.bufferStar = null;
  this.bufferStar2 = null;

  this.addStar = function(ID,Title, x, y) {
    this.stars.push(new Star(ID,Title, x, y));
    this.links.push([]);
  };

  //add a function to connect the stars

  this.exportStarArray = function() {
    var tmpArray = [];
    for (star in this.stars) {
      var tmp = {};
      tmp.Title = star.Title;
      tmp.x = star.s;
      tmp.y = star.y;
      tmp.ID = star.ID;
      tmpArray.push(tmp);
    }
    return tmpArray;
  };
  this.exportGraphStructure = function() {
    return this.links;
  };
  this.deleteStar = function(star) {
    var index = this.stars.indexOf(star);
    if (index !== 0) {
      console.log(index);
      for (var i = 0; i < this.links.length; i++) {
        for (var j = 0 ; j < this.links[i].length; j++) {
          if (this.links[i][j] === index) {
            this.links[i].splice(j,1);
          }
        }
      }
      this.swapStarsLinksAndReferences(star, this.stars[this.stars.length - 1]);
      this.links.splice(this.links.length-1, 1);
      this.stars.splice(this.stars.length-1, 1);
    }
  };

  this.setRootStar = function(star) {
    this.swapStarsLinksAndReferences(star, this.stars[0]);
  };
  this.swapStarsLinksAndReferences = function(starA, starB) {
    var indexA = this.stars.indexOf(starA);
    var indexB = this.stars.indexOf(starB);
    //perform swap of star with current root node
    var tmp = starB;
    this.stars[indexB] = starA;
    this.stars[indexA] = tmp;
    // update references before swap
    for (var i = 0; i < this.links.length; i++) {
      var linkContainsA = this.links[i].includes(indexA);
      var linkContainsB = this.links[i].includes(indexB);
      if (linkContainsA) {
        this.links[i].splice(this.links[i].indexOf(indexA), 1);
      }
      if (linkContainsB) {
        this.links[i].splice(this.links[i].indexOf(indexB), 1);
      }
      if (linkContainsA) {
        this.links[i].push(indexB)
      }
      if (linkContainsB) {
        this.links[i].push(indexA);
      }
    }

    //perform swap of the links
      var tmp = this.links[indexB];
      this.links[indexB] = this.links[indexA];
      this.links[indexA] = tmp;
  };

  this.findFirstStars = function() {
    for (var i = 0; i < this.stars.length; i++) {
      if (Math.abs(mouseX - this.stars[i].x) < this.stars[i].size) {
        if (Math.abs(mouseY - this.stars[i].y) < this.stars[i].size) {
          if (this.stars[i].isHovering()) {
            return this.stars[i];
          }
        }
      }
    }
    return null;
  };

  this.clickHandler = function(event) {
    var currentStar = this.findFirstStars();
    if (currentStar) {
      var toUrl = "/stars/" + currentStar.ID;
      window.location.href = toUrl;
    }
  };

  this.display = function(graphics) {
    //render stars
    var tmp = this.findFirstStars();
    if (tmp !== null) {
      graphics.font = "20px Arial";
      graphics.textBaseline="middle";
      graphics.fillText(tmp.Title,tmp.x + 13, tmp.y);
    }

    for (var i = 0; i < this.stars.length; i++) {
      if (i === 0 ) {
        graphics.fillStyle = "#F5F5F5";
        graphics.beginPath();
        graphics.arc(this.stars[0].x, this.stars[0].y, this.stars[0].size + 5, 0, 2*Math.PI);
        graphics.fill();
        graphics.fillStyle = "#263238";
        graphics.beginPath();
        graphics.arc(this.stars[0].x, this.stars[0].y, this.stars[0].size + 3, 0, 2*Math.PI);
        graphics.fill();
        graphics.fillStyle = "#F5F5F5";
      }

      this.stars[i].display(graphics);
    }
    // render links
    graphics.strokeStyle="#F5F5F5";
    graphics.lineWidth=5;
    for (var i = 0; i < this.links.length; i++) {
      for (var j = 0; j < this.links[i].length; j++) {
        graphics.beginPath();
        dashedLine(this.stars[i].x, this.stars[i].y, this.stars[this.links[i][j]].x , this.stars[this.links[i][j]].y, currentOffset, graphics);
        graphics.closePath();
        graphics.stroke();
      }
    }
    // if a connection is being drawn, the render that.
    if (this.bufferStar2 !== null && this.bufferStar !== null ) {
      dashedLine(this.bufferStar.x, this.bufferStar.y, this.bufferStar2.x,this.bufferStar2.y, currentOffset, graphics);
      graphics.stroke();
    }
  };
}
//create constellation instance


//rendering
function fitToContainer(canvas){
 screenWidth = $('.hidden').width();
 screenHeight = $('.hidden').height()*.7;
$("#viewCanvas").attr('width', screenWidth);
$("#viewCanvas").attr('height', screenHeight);
}

function draw(canvas) {
graphics.fillStyle = '#263238';
  graphics.rect(0,0,canvas.width,canvas.height);
  graphics.fill();
  graphics.fillStyle = "#F5F5F5";
  /*dsiplay current rendering*/
  c.display(graphics);
}



/* first time initialiation */

$(document).ready(function() {
  //make sure the canvas is the appropriate size
  fitToContainer(canvas);
  // draw the graphics on the canvas
  draw(canvas);
  // track mouse clicks and drags separately
  $( document )
  .mousedown(function(event) {
    isDragging = false;
  })
  .mousemove(function(event) {
    prevMouseX = mouseX;
    prevMouseY = mouseY;
    // make sure the mouseX and mouseY variables are being updated if the user moves them around
    getMouse(event);
    if (Math.abs(prevMouseX - mouseX) > mouseDragRadius || Math.abs(prevMouseY - mouseY) > mouseDragRadius) {
      var wasDragging = isDragging;
      isDragging = true;
    }
 })
 .mouseup(function(event) {
    var wasDragging = isDragging;
    isDragging = false;
    if (!wasDragging) {
       c.clickHandler(event);
    }
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
    currentOffset += 4;
    if (currentOffset >= 100) currentOffset = 0;
};

var runTime = setInterval(run,30);
