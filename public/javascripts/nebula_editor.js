var canvas = document.getElementById('editorCanvas');
var graphics = canvas.getContext( '2d' );
var mouseX = 0;
var mouseY = 0;
var prevMouseX = 0;
var prevMouseY = 0;
var mouseDragRadius = 0.1;
var screenWidth = $('.hidden').width();
var screenHeight = $('.hidden').height()*.7;
var isDragging = false;
//will import font later

var getMouse = function(event) {
  var parentOffset = $('#editorCanvas').offset();
  mouseX = event.pageX - parentOffset.left;
  mouseY = event.pageY - parentOffset.top;
}
/* Creating the classes and objects */

function Star(ID, Title) {
  this.x = (Math.random()*screenWidth*.9) + screenWidth*.05;
  this.y = (Math.random()*screenHeight*.9) + screenHeight*.05;
  this.ID = ID;
  this.size = 10;
  this.Title = Title
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
  this.stars = [new Star(12124,"Star 1"), new Star(13532,"Star 2"),new Star(12124,"Star 3"), new Star(132431,"Star 4")];
  this.links = [[],[],[],[]];
  this.bufferStar = null;
  this.bufferStar2 = null;
  this.addStar = function(ID,Title) {
    this.stars.push(new Star(ID,Title));
    this.links.push([]);
  };

  this.exportStarArray = function() {
    var tmpArray = [];
    for (star in this.stars) {
      var tmp = {};
      tmp.Title = star.Title;
      tmp.x = star.s;
      tmp.y = star.y;
      tmp.ID = ID;
      tmpArray.push(tmp);
    }
    return tmpArray;
  };
  this.exportGraphStructure = function() {
    return this.links;
  };
  this.deleteStar = function(star) {
    var index = this.stars.indexOf(star);

  }
  this.setRootStar = function(star) {
    var index = this.stars.indexOf(star);
    //perform swap of star with current root node
    var tmp = this.stars[0];
    this.stars[0] = star;
    this.stars[index] = tmp;
    //perform swap of the links

      for (var i = 0; i < this.links.length; i++) {
        var linkContains0 = this.links[i].includes(0);
        var linkContainsIndex =this.links[i].includes(index);
        if (linkContainsIndex) {
          this.links[i].splice(this.links[i].indexOf(index), 1);
        }
        if (linkContains0) {
          this.links[i].splice(this.links[i].indexOf(0), 1);
        }
        if (linkContainsIndex) {
          this.links[i].push(0)
        }
        if (linkContains0) {
          this.links[i].push(index);
        }
      }

    console.log("before swap " + this.links);
    var tmp = this.links[0];
    this.links[0] = this.links[index];
    this.links[index] = tmp;
    //swap link references such that they don't link to themselves if the two connections are already linked

    console.log("after swap " + this.links);
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
    switch (event.which) {
      case 1:
        var currentStar = this.findFirstStars();
        if (currentStar !== null) {
          this.setRootStar(currentStar);
        }
        break;
      case 3:
        var currentStar = this.findFirstStars();
        if (currentStar !== null) {
          this.deleteStar(currentStar);
        }
        break;
    }
  };
  this.beginDragHandler = function(event) {
    switch (event.which) {
      case 1:
        this.bufferStar = this.findFirstStars();
        break;
      case 3:
        this.bufferStar = this.findFirstStars();
        this.bufferStar2 = new Star(10);
        this.bufferStar2.x = mouseX;
        this.bufferStar2.y = mouseY;
        break;
    }
  };
  this.draggingHandler = function(event) {
    switch (event.which) {
      case 1:
        if ((this.bufferStar !== null)) {
          this.bufferStar.x = mouseX;
          this.bufferStar.y = mouseY;
        }
        break;
      case 3:
        if ((this.bufferStar !== null)) {
          this.bufferStar2.x = mouseX;
          this.bufferStar2.y = mouseY;
        }
        break;
    }
  };
  this.draggedHandler = function(event) {
    switch (event.which) {
      case 1:
        this.bufferStar = null;
        break;
      case 3:
        this.bufferStar2 = this.findFirstStars();
        if ((this.bufferStar2 !== null) && (this.bufferStar !== null)) {
          var fromIndex = this.stars.indexOf(this.bufferStar);
          var toIndex = this.stars.indexOf(this.bufferStar2);
          this.links[fromIndex].push(toIndex);
        }
        this.bufferStar = null;
        this.bufferStar2 = null;
        break;
    }
  };
  this.dashedTo = function(fromStar, toStar) {
    var speed = 1;

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
        graphics.moveTo(this.stars[i].x, this.stars[i].y);
        graphics.lineTo(this.stars[this.links[i][j]].x,this.stars[this.links[i][j]].y);
        graphics.stroke();
      }
    }
    // if a connection is being drawn, the render that.
    if (this.bufferStar2 !== null && this.bufferStar !== null ) {
      graphics.moveTo(this.bufferStar.x, this.bufferStar.y);
      graphics.lineTo(this.bufferStar2.x,this.bufferStar2.y);
      graphics.stroke();
    }
  };
}
//create constellation instance

var c = new Constellation();

//rendering
function fitToContainer(canvas){
 screenWidth = $('.hidden').width();
 screenHeight = $('.hidden').height()*.7;
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
      if (!wasDragging) {
        c.beginDragHandler(event);
      } else {
        c.draggingHandler(event);
      }
    }
 })
 .mouseup(function(event) {
    var wasDragging = isDragging;
    isDragging = false;
    if (!wasDragging) {
       c.clickHandler(event);
    } else {
      c.draggedHandler(event)
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
};

var runTime = setInterval(run,30);
