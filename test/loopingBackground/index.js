const c = new Candy();
c.createCanvas(650, 350);
let ctx = c.ctx;


let bg_image = c.loadImage('../src/bg_trees.png');
let bg_image_long = c.loadImage('../src/bg_trees_long.png');

let width = 0;
let height = 0;
let x = width/2;
function preload() {
  width = bg_image_long.naturalWidth;
  height = bg_image_long.naturalHeight;
  x = width/2;
  animate();
}

// let x = 650;

function animate() {
  c.clear();
  
  x += 5;
  console.log(x, width)
  if(x > width) {
    x = width/2
  }
  c.image(bg_image_long, x - width, -150, width, height)
  
  // x += 5;
  // if(x > width*2) {
  //   x = width
  // }
  // c.image(bg_image, x - 0, 50, width, height)
  // c.image(bg_image, x - width, 50, width, height)
  // c.image(bg_image, x - width*2, 50, width, height)

  c.loop(animate)
}
