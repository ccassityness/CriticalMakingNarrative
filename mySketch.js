lines = ["no bees no food","monarchs are vanishing","plant milkweed","skip the pesticides","migration routes lost","let your garden grow","small wings big work","plant native flowers","colony collapse","save the pollinators","no mow may","populations crashing","build a bee hotel","climate shifts routes","plant wildflowers","the hive is failing","butterflies feel heat first","leave the weeds","1 in 3 bites","plant coneflower"]
i = 0;
particles = [];

let hexes = [];
const R = 36;

const flowerColors = ["#FF6B6B","#FF8E53","#FFC0CB","#FF69B4","#DA70D6","#9370DB","#FF4500","#FF6347"];

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
        col: color(random(200, 255), random(150, 220), random(0, 60)),
        petalColor: random(flowerColors),
        petalCount: floor(random(4, 7)),
        flowerSize: random(8, 16)
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

function drawFlower(cx, cy, petalColor, petalCount, flowerSize) {
  // petals
  fill(petalColor);
  noStroke();
  for (let i = 0; i < petalCount; i++) {
    const angle = radians(360 / petalCount * i);
    const px = cx + cos(angle) * flowerSize * 0.6;
    const py = cy + sin(angle) * flowerSize * 0.6;
    ellipse(px, py, flowerSize * 0.8, flowerSize * 0.8);
  }
  // center
  fill(255, 220, 0);
  ellipse(cx, cy, flowerSize * 0.7, flowerSize * 0.7);
}

function draw() {
  background(255);
  noStroke();
  for (let h of hexes) {
    fill(h.col);
    drawHex(h.x, h.y, R - 1);
    drawFlower(h.x, h.y, h.petalColor, h.petalCount, h.flowerSize);
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
