lines = ["no bees no food","monarchs are vanishing","plant milkweed","skip the pesticides","migration routes lost","let your garden grow","small wings big work","plant native flowers","colony collapse","save the pollinators","no mow may","populations crashing","build a bee hotel","climate shifts routes","plant wildflowers","the hive is failing","butterflies feel heat first","leave the weeds","plant coneflower"]
i = 0;
particles = [];
let pollens = [];
let bees = [];
let butterflies = [];

let meadow;

function preload() {
  meadow = loadImage('meadow.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 8; i++) {
    bees.push(new Bee());
  }
  for (let i = 0; i < 5; i++) {
    butterflies.push(new Butterfly());
  }
}

function draw() {
  image(meadow, 0, 0, windowWidth, windowHeight);

  // pollen
  if (random() < 0.3) {
    pollens.push(new Pollen());
  }
  for (let i = pollens.length - 1; i >= 0; i--) {
    pollens[i].update();
    pollens[i].show();
    if (pollens[i].finished()) {
      pollens.splice(i, 1);
    }
  }

  // bees
  for (let b of bees) {
    b.update();
    b.show();
  }

  // butterflies
  for (let b of butterflies) {
    b.update();
    b.show();
  }

  // text particles
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

class Bee {
  constructor() {
    this.x = random(windowWidth);
    this.y = random(windowHeight);
    this.angle = random(TWO_PI);
    this.speed = random(1, 2.5);
    this.wobble = 0;
    this.size = random(25, 40);
  }
  update() {
    this.angle += random(-0.1, 0.1);
    this.wobble += 0.3;
    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed + sin(this.wobble) * 0.5;
    if (this.x < -20) this.x = windowWidth + 20;
    if (this.x > windowWidth + 20) this.x = -20;
    if (this.y < -20) this.y = windowHeight + 20;
    if (this.y > windowHeight + 20) this.y = -20;
  }
  show() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    noStroke();
    // body
    fill(255, 200, 0);
    ellipse(0, 0, this.size, this.size * 0.6);
    // stripes
    fill(30, 30, 30, 180);
    rect(-this.size * 0.15, -this.size * 0.3, this.size * 0.15, this.size * 0.6);
    rect(this.size * 0.1, -this.size * 0.3, this.size * 0.15, this.size * 0.6);
    // wings
    fill(200, 230, 255, 150);
    ellipse(-this.size * 0.1, -this.size * 0.5, this.size * 0.7, this.size * 0.4);
    ellipse(this.size * 0.1, -this.size * 0.5, this.size * 0.7, this.size * 0.4);
    pop();
  }
}

class Butterfly {
  constructor() {
    this.x = random(windowWidth);
    this.y = random(windowHeight);
    this.angle = random(TWO_PI);
    this.speed = random(0.5, 1.5);
    this.wobble = 0;
    this.wingFlap = 0;
    this.size = random(35, 55);
    this.col1 = color(random([
      [255, 100, 150],
      [255, 140, 0],
      [150, 80, 200],
      [80, 180, 120],
      [255, 200, 50]
    ]));
  }
  update() {
    this.angle += random(-0.05, 0.05);
    this.wobble += 0.2;
    this.wingFlap += 0.25;
    this.x += cos(this.angle) * this.speed;
    this.y += sin(this.angle) * this.speed + sin(this.wobble) * 0.8;
    if (this.x < -20) this.x = windowWidth + 20;
    if (this.x > windowWidth + 20) this.x = -20;
    if (this.y < -20) this.y = windowHeight + 20;
    if (this.y > windowHeight + 20) this.y = -20;
  }
  show() {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    noStroke();
    let flap = sin(this.wingFlap) * 0.8;
    // upper wings
    fill(red(this.col1), green(this.col1), blue(this.col1), 200);
    ellipse(-this.size * 0.4 * flap, -this.size * 0.2, this.size * 0.9, this.size * 0.7);
    ellipse(this.size * 0.4 * flap, -this.size * 0.2, this.size * 0.9, this.size * 0.7);
    // lower wings
    fill(red(this.col1), green(this.col1), blue(this.col1), 160);
    ellipse(-this.size * 0.3 * flap, this.size * 0.2, this.size * 0.6, this.size * 0.5);
    ellipse(this.size * 0.3 * flap, this.size * 0.2, this.size * 0.6, this.size * 0.5);
    // body
    fill(30, 30, 30);
    ellipse(0, 0, this.size * 0.15, this.size * 0.8);
    pop();
  }
}
