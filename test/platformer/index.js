const c = new Candy();
c.createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);
c.resize();

let playerImg = c.loadImage('./src/images/Idle_1.png');
let playerRunImg = c.loadImage('./src/images/run.png');
let playerJumpImg = c.loadImage('./src/images/glide.png');


let player = null;

function preload() {
  player = new Player(playerImg, playerRunImg, playerJumpImg);
  animate();
}

function onKeyPressed() {
//   if ( c.keyIsPressed(KEY_D) ) {
//     player.vel.add(new Vector(1, 0))
//     player.direction = 1;
//     player.running = true;
//   }
//   if ( c.keyIsPressed(KEY_A) ) {
//     player.vel.add(new Vector(-1, 0))
//     player.direction = -1;
//     player.running = true;
//   }

//   if ( c.keyIsPressed(KEY_SPACE) && player.canJump ) {
//     player.canJump = false;
//     player.vel.add(new Vector(0, -40))
//   };
}

function animate() {
  c.clear();
  
  player.update();
  player.render();

  c.loop(animate)
}
