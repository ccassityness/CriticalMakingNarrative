lines = ["no bees no food","monarchs are vanishing","plant milkweed","skip the pesticides","migration routes lost","let your garden grow","small wings big work","plant native flowers","colony collapse","save the pollinators","no mow may","populations crashing","build a bee hotel","climate shifts routes","plant wildflowers","the hive is failing","butterflies feel heat first","leave the weeds","1 in 3 bites","plant coneflower"]
i = 0;
particles = [];

let meadow;

function preload() {
  meadow = loadImage('meadow.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  image(meadow, 0, 0, windowWidth, windowHeight);

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }
}

function mouseClicked() {
  let p = new Particle(mouseX, mouseY, lines[i]);
  particles.push(p);
  if (i < (lines.length - 1)) {
    i++;
  } else {
    i = 0;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Particle {
  constructor(x, y, text) {
    this.x = x;
    this.y = y;
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
    this.size = random(15, 50);
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
    textFont("Georgia");
    textAlign(CENTER, CENTER);
    // dark green shadow
    fill("#1B4332");
    text(this.text, this.x + 2, this.y + 2);
    // white text on top
    fill("white");
    text(this.text, this.x, this.y);
  }
}
