let c = new Candy();
c.createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);

let img = c.loadImage('/demos/particleSystem/texture/emitter1.png')

function preload() {
  animate();
}

let ps = new ParticleSystem(CANVAS_WIDTH / 2, 400, img);


function animate() {
  c.clear('#151515');
  
  ps.setOrigin(mouseX, mouseY)

  for (let i = 0; i < 5; i++) {
    ps.addParticle();
  }
  ps.update();

  c.loop(animate);
}