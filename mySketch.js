lines = ["touch the screen","set the tone","make it work","craft the computation","code the thing","connect the dots","interact with the machine","push the text","pull the code","press on"]
i = 0;
particles = [];

let hexes = [];
const R = 36;

function setup() {
  createCanvas(windowWidth, windowHeight);
  generateHexes();
}

function generateHexes() {
  hexes = [];
  const hexW = R * sqrt(3);
  const vertSpacing = R * 1.5;
  let row = 0;
  for (let y = R; y < height + R; y += vertSpacing, row++) {
    const offset = (row % 2) * (hexW / 2);
    for (let x = hexW / 2 + offset; x < width + hexW; x += hexW) {
      hexes.push({
        x, y,
        col: color(random(200, 255), random(150, 220), random(0, 60))
      });
    }
  }
}

function drawHex(cx, cy, r) {
  beginShape();
  for (let i = 0; i < 6; i++) {
    const angle = radians(60 * i - 30);
    vertex(cx + r * cos(angle), cy + r * sin(angle));
  }
  endShape(CLOSE);
}

function draw() {
  // Draw yellow honeycomb background
  noStroke();
  for (let h of hexes) {
    fill(h.col);
    drawHex(h.x, h.y, R - 1);
  }

  // Draw particles on top
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
  generateHexes();
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
    textFont("Courier");
    textAlign(CENTER, CENTER);
    fill("green");
    text(this.text, this.x, this.y);
  }
}
