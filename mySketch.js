//Let's combine the two previous demos
//Now we're going to let the lines move after we create them
//Try changing the lines as before
lines=["touch the screen","set the tone","make it work","craft the computation","code the thing","connect the dots","interact with the machine","push the text","pull the code","press on"]
//We will use i to track which line we just showed
i=0;
//But we'll also create a box to hold our lines as they move
particles = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
//Try changing the initial background color
	background(50);
}
function draw() {
	background(50);
	//This moves the particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      // remove this particle
      particles.splice(i, 1);
    }
  }
}
//This draws the word with each mouse click
function mouseClicked() {
	let p = new Particle(mouseX,mouseY,lines[i]);
    particles.push(p);
	if (i<(lines.length-1)) {
		i++;
	}
	else {
		i=0;
	}

}

class Particle {
  constructor(x,y,text) {
		//This sets the x value to mouse position
    this.x = x;
		//This keeps the y at mouse position
    this.y = y;
		//This sets the range of x movement - try limiting it to + or -
    this.vx = random(-1, 1);
		//This sets the range of y movement - try limiting it to + or -
    this.vy = random(-1, 1);
		//This sets the text size to be consistent
		this.size = random(15,50);
		//This sets the current line to the particle
		this.text = text;
  }

  finished() {
    return (this.x < 0 || this.x > windowWidth);
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
  }

  show() {
    noStroke();
		textSize(this.size);
		//Try any web safe font
		textFont("Courier");
		//This centers the text on the click
		textAlign(CENTER, CENTER);
		//This sets the fill to a static color - can you make it random?
		//You can also add the outline
    //stroke(255);
		//This keeps R and G values at 255 to allow for yellows
		//Try changing it!
    fill("green");
		//This positions the text
    text(this.text, this.x, this.y);
  }
}
