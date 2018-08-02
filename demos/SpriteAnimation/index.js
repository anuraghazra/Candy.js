let c = new Candy();
c.createCanvas(1280, 720);
c.resize();

let runSheet = c.loadImage('./images/run_spritesheet.png');

let sprite = null;
function preload() {
  sprite = new Sprite({
    img: runSheet,
    x: 0, y: 0,
    cols: 10, rows: 1,
    ticksPerFrame: 3,
    resizeBy: 1
  });
  
  animate();
}

let frameIndex = 0;
function animate() {
  c.clear();

  sprite.animate();
  sprite.draw();

  frameIndex = c.loop(animate);
}