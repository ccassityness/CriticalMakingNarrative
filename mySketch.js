lines = ["no bees no food","monarchs are vanishing","plant milkweed","skip the pesticides","migration routes lost","let your garden grow","small wings big work","plant native flowers","colony collapse","save the pollinators","no mow may","populations crashing","build a bee hotel","climate shifts routes","plant wildflowers","the hive is failing","butterflies feel heat first","leave the weeds","1 in 3 bites","plant coneflower"]
i = 0;
particles = [];
let pollens = [];

let meadow;

function preload() {
  meadow = loadImage('meadow.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  image(meadow, 0, 0, windowWidth, windowHeight);

  // spawn new pollen
  if (random() < 0.3) {
    pollens.push(new Pollen());
  }
  // update and draw pollen
  for (let i = pollens.length - 1; i >= 0; i--) {
    pollens[i].update();
    pollens[i].show();
    if (pollens[i].finished()) {
      pollens.splice(i, 1);
    }
  }

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
    this.alpha = 255;
  }
  finished() {
    return this.alpha <= 0;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 1.5;
  }
  show() {
    noStroke();
    textSize(this.size);
    textFont("Georgia");
    textAlign(CENTER, CENTER);
    fill(27, 67, 50, this.alpha);
    text(this.text, this.x + 2, this.y + 2);
    fill(255, 255, 255, this.alpha);
    text(this.text, this.x, this.y);
  }
}

class Pollen {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = random(windowWidth);
    this.y = windowHeight + 10;
    this.size = random(3, 8);
    this.vx = random(-0.5, 0.5);
    this.vy = random(-0.5, -1.5);
    this.alpha = random(150, 255);
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vx += random(-0.05, 0.05);
  }
  finished() {
    return this.y < -10;
  }
  show() {
    noStroke();
    fill(255, 220, 0, this.alpha);
    ellipse(this.x, this.y, this.size, this.size);
  }
}
