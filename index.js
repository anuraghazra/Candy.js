let n = 1;
let t = 8;
let rotationAngle = 135;

const c = new Candy();
c.createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
c.clear(25);

c.blendMode(ADD);
c.shadow(0, 0, 20, rgba(255,255,255,0.8));
c.noStroke();
c.fill(255);
c.textFont('Century Gothic');
c.textSize(100);
c.textAlign(CENTER);
c.textBaseline(MIDDLE);
c.text('Candy.js', CANVAS_WIDTH/2, -20+CANVAS_HEIGHT/2);
c.textSize(25);
c.text('Canvas Rendering Engine', CANVAS_WIDTH/2, 50+CANVAS_HEIGHT/2);

function animate() {
  
  c.noShadow();
  let a = n * rotationAngle;
  let r = t * Math.sqrt(n);

  let x = r * Math.cos(a) + CANVAS_WIDTH / 2;
  let y = r * Math.sin(a) + CANVAS_HEIGHT / 2;

  c.fill( hsla( a - r, 80, 50, 0.3) );
  c.noStroke();
  c.circle(x, y, 5);

  n++
  c.loop(animate);
}

for (let i = 0; i < 15; i++) {
  animate(); 
}