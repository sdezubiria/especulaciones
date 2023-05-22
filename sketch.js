let imagen;
let iconos = [];
let icono, icono1, icono2, icono3;
let amplitude = 100;
let frequency = 0.01;
let noiseAmount = 50;
let gridSize = 20;
let numCols, numRows;
let numPoints = 360;
let radius = 100;
let squiggleFactor = 10;
let numCircles = 10;
let imprimir = false;
let num;

function preload() {
  iconos[0] = loadImage("amor.png");
  iconos[1] = loadImage("chulo.png");
  iconos[2] = loadImage("mundo.png");
  iconos[3] = loadImage("personas.png");
  iconos[4] = loadImage("p.png");
}

function setup() {
  createCanvas(800, 800);
  icono = new Icono(0);
  icono1 = new Icono(1);
  icono2 = new Icono(2);
  icono3 = new Icono(3);
  numCols = width / 2 / gridSize;
  numRows = height / 2 / gridSize;
}

function draw() {
  imageMode(CENTER);
  background(255);
  if (imprimir == false) {
    image(iconos[4], width / 2, height / 2);
  }
  if (!imprimir) {
    icono.mover();
    icono1.mover();
    icono2.mover();
    icono3.mover();
    noStroke();
    fill("#ff8080");
    rectMode(CENTER);
    rect(width / 2, height - 40, 300, 60, 20);
  }
  if (imagen || imprimir == true) {

    // chulo
    let xOffset = width / 2;
    let yOffset = height / 4;
    noiseAmount = map(icono1.bx, width, 0, 1, 200);
    for (let i = 0; i < int(map(icono1.by, height, 0, 1, 60)); i++) {
      for (let x = width / 2; x < width; x += 1) {
        let y = yOffset + sin(x * frequency) * amplitude;
        let noiseValue = noise(xOffset) * noiseAmount;
        y += noiseValue;
        point(x, y + i * 5);
        xOffset += 0.01;
      }
    }

    // corazon
    stroke(0);
    beginShape();
    noFill();
    let intervalo = map(icono.bx, width, 0, 20, 2);
    for (let i = 0; i < width / 2 / 20; i++) {
      vertex(i * intervalo + noise(i) * map(icono.bx, width, 0, 1, 200), 0);
      vertex(
        i * intervalo + noise(i) * map(icono.by, width, 0, 1, 200),
        height / 2
      );
    }
    endShape();

    // mundo
    push();
    translate(0, height / 2);
    for (let col = 0; col < numCols; col++) {
      for (let row = 0; row < numRows; row++) {
        let x = col * gridSize; // Calculate x position
        let y = row * gridSize; // Calculate y position
        let offset = map(icono2.bx, width, 0, 0, 30);
        // Calculate the squiggly offset based on mouseX
        let squiggleOffset = map(icono2.by, width, 0, 0, gridSize);
        // Draw a rectangle with squiggly edges
        drawSquigglyRectangle(x, y, gridSize, gridSize, squiggleOffset, offset);
      }
    }
    pop();
    // personas
    // Calculate the squiggly factor based on mouseY
    let mappedMouseY =
      map(icono3.by, height, 0, 0, 1) + map(icono3.bx, width, 0, 0, 1);
    let squiggleAmount = mappedMouseY * squiggleFactor;

    // Calculate the points of the squiggly circle
    let angleStep = 360 / numPoints;
    push();
    translate(width / 4, height / 4);
    for (let j = 1; j < 100; j++) {
      translate(j, 0);
      radius = 100 - map(icono3.by, height, 0, 100, 500);
      beginShape();
      for (let i = 0; i < numPoints; i++) {
        let angle = radians(i * angleStep);
        let x = width / 2 + cos(angle) * radius;
        let y = height / 2 + sin(angle) * radius;
        // Add squiggly offset to the points
        let offsetX = map(
          noise(i * 0.1, frameCount * 0.01),
          0,
          1,
          -squiggleAmount,
          squiggleAmount
        );
        let offsetY = map(
          noise(i * 0.2, frameCount * 0.02),
          0,
          1,
          -squiggleAmount,
          squiggleAmount
        );
        x += offsetX;
        y += offsetY;
        vertex(x, y);
      }
      endShape(CLOSE);
    }
    pop();

    if (imprimir && num === 0) {
  // Get the p5.js canvas element
  const canvas = document.getElementById("defaultCanvas0");

  // Create a new canvas element to draw the screenshot on
  const screenshotCanvas = document.createElement("canvas");
  screenshotCanvas.width = canvas.width;
  screenshotCanvas.height = canvas.height;

  // Get the 2D context of the screenshot canvas
  const context = screenshotCanvas.getContext("2d");

  // Draw the p5.js canvas onto the screenshot canvas
  context.drawImage(canvas, 0, 0);

  // Convert the canvas image to a data URL
  const dataURL = screenshotCanvas.toDataURL();

  // Create a link element to download the screenshot
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "screenshot.png";

  // Programmatically trigger the download
  link.click();
      num++;
    }
  }
}
function mousePressed() {
  icono.mp();
  icono1.mp();
  icono2.mp();
  icono3.mp();
  if (mouseX > width / 2 - 150 && mouseX < width / 2 + 150) {
    if (mouseY > height - 40 - 30 && mouseY < height + 40 + 30) {
      console.log(mouseY);
      imprimir = true;
    }
  }
}

function mouseDragged() {
  icono.md();
  icono1.md();
  icono2.md();
  icono3.md();
}
function keyPressed() {
  if (keyCode == ENTER) {
    imagen = true;
  }
  if (keyCode == CONTROL) {
    imprimir = true;
  }
}

function drawSquigglyRectangle(x, y, w, h, offset, o) {
  // Calculate the points of the rectangle with squiggly edges
  let x1 = x + offset;
  let y1 = y + offset;
  let x2 = x + w - offset;
  let y2 = y + offset;
  let x3 = x + w - offset;
  let y3 = y + h - offset;
  let x4 = x + offset;
  let y4 = y + h - offset;

  // Draw the rectangle
  beginShape();
  vertex(x1, y1);
  quadraticVertex(x + noise(1) * o + w / 2, y, x2, y2);
  quadraticVertex(x + noise(1) * o + w, y + h / 2, x3, y3);
  quadraticVertex(x + noise(1) * o + w / 2, y + h, x4, y4);
  quadraticVertex(x + noise(1) * o, y + h / 2, x1, y1);
  endShape();
}
class Icono {
  constructor(tipo) {
    if (tipo == 0) {
      this.bx = width / 4;
      this.by = height / 4;
    }
    if (tipo == 1) {
      this.bx = (width * 3) / 4;
      this.by = height / 4;
    }
    if (tipo == 2) {
      this.bx = width / 4;
      this.by = (height * 3) / 4;
    }
    if (tipo == 3) {
      this.bx = (width * 3) / 4;
      this.by = (height * 3) / 4;
    }
    this.boxSize = 75;
    this.overBox = false;
    this.locked = false;
    this.xOffset = 0.0;
    this.yOffset = 0.0;
    this.tipo = tipo;
  }

  mover() {
    if (
      mouseX > this.bx - this.boxSize &&
      mouseX < this.bx + this.boxSize &&
      mouseY > this.by - this.boxSize &&
      mouseY < this.by + this.boxSize
    ) {
      this.overBox = true;
      if (!this.locked) {
        stroke(255);
        fill(153);
      }
    } else {
      stroke(153);
      fill(153);
      this.overBox = false;
    }

    image(iconos[this.tipo], this.bx, this.by, this.boxSize, this.boxSize);
  }

  mp() {
    if (this.overBox) {
      this.locked = true;
      fill(255, 255, 255);
    } else {
      this.locked = false;
    }
    this.xOffset = mouseX - this.bx;
    this.yOffset = mouseY - this.by;
  }

  md() {
    if (this.locked) {
      this.bx = mouseX - this.xOffset;
      this.by = mouseY - this.yOffset;
    }
  }

  mr() {
    this.locked = false;
  }
}
function captureScreenshot() {
  // Get the p5.js canvas element
  const canvas = document.getElementById("defaultCanvas0");

  // Create a new canvas element to draw the screenshot on
  const screenshotCanvas = document.createElement("canvas");
  screenshotCanvas.width = canvas.width;
  screenshotCanvas.height = canvas.height;

  // Get the 2D context of the screenshot canvas
  const context = screenshotCanvas.getContext("2d");

  // Draw the p5.js canvas onto the screenshot canvas
  context.drawImage(canvas, 0, 0);

  // Convert the canvas image to a data URL
  const dataURL = screenshotCanvas.toDataURL();

  // Create a link element to download the screenshot
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "screenshot.png";

  // Programmatically trigger the download
  link.click();
}

