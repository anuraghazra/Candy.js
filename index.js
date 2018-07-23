// INIT CANDY
const c = new Candy();
c.createCanvas(650, 350);

let x = 0;

function animate() {
  c.clear();

  c.blendMode(SCREEN);

  c.smooth('high');
  c.fill(55, 255, 155, 0.5);
  c.circle(100 * Math.sin(x * 0.1) + 200, 150, 50);
  c.stroke('deepskyblue').strokeWeight(5);

  c.circle(mouseX, mouseY, 50);

  c.ctx.lineCap = 'round';
  c.ctx.lineJoin = 'miter';
  c.stroke('blue').strokeWeight(5);
  c.line(0, 0, 150, 150);

  c.noStroke();

  let mapped = map(mouseX, 0, 650, 0, 100);

  // x, y, r1, r2
  let radgrad = c.radialGradient(150 + 50, 75, 75, 0,
    ['crimson-0.9', 'purple', 'deepskyblue']
  );
  c.fill(radgrad);
  c.rect(150, 20, 100, 100);

  let grad = c.linearGradient(mapped, mapped, 350, 0,
    ['crimson', 'purple', 'deepskyblue']
  );
  c.fill(grad)
  c.stroke(grad)
  c.strokeWeight(2);

  c.textFont('Arial');
  c.textSize(50);
  c.text('Hello World', 150, 200);

  c.textFont('Impact');
  c.textSize(50);
  c.text('Canvas', 150, 250);

  c.push();
  c.noStroke();
  c.fill('tomato')
  c.transRot(200, 200, x / 50);
  c.rect(-50, -50, 100, 100, 10);
  c.pop();

  c.fill('yellowgreen');
  c.noStroke();
  c.triangle(300, 100, 100, 60);

  c.noStroke();
  c.fill('red')
  c.circle(CANVAS_WIDTH/2, CANVAS_HEIGHT/2,5)

  c.fill('rgba(0,0,0,0.5)')
  c.textFont('Impact');
  c.ctx.textAlign = 'center'
  c.ctx.textBaseline = 'middle'
  c.textSize(50);
  c.text('Canvas', CANVAS_WIDTH/2, CANVAS_HEIGHT/2);
  x++;
  c.loop(animate)
}