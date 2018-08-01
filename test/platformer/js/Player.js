function Player(img, runningImg, playerJumpImg) {
  this.pos = new Vector(100,100)
  this.vel = new Vector(0, 0);
  
  this.runningImg = runningImg;
  this.playerJumpImg = playerJumpImg;
  this.idleImg = img;

  this.sprite = new Sprite({
    img : this.idleImg,
    cols : 10,
    rows : 1,
    ticksPerFrame: 5,
    x : this.pos.x,
    y : this.pos.y,
    resizeBy : 3.5
  })

  this.spriteRun = new Sprite({
    img : this.runningImg,
    cols : 10,
    rows : 1,
    ticksPerFrame: 5,
    x : this.pos.x,
    y : this.pos.y,
    resizeBy : 3.5
  })

  this.spriteJump = new Sprite({
    img : this.playerJumpImg,
    cols : 10,
    rows : 1,
    ticksPerFrame: 5,
    x : this.pos.x,
    y : this.pos.y,
    resizeBy : 3.5
  })

  this.gravity = new Vector(0, 3);

  this.canJump = false;
  this.running = false;


  this.direction = 1;
}

Player.prototype.update = function() {
  this.pos.add(this.vel);
  this.vel.add(this.gravity);

  if(this.pos.y+this.sprite.dh >= WINDOW_HEIGHT) {
    this.pos.y = WINDOW_HEIGHT-this.sprite.dh;
    this.gravity = new Vector(0, 0);
    this.canJump = true;
  } else {
    this.canJump = false;
    this.gravity = new Vector(0, 3);
  }

  this.running = false;
  this.vel.x = 0

  if ( c.keyIsPressed(KEY_D) ) {
    this.vel.x = 7;
    this.direction = 1;
    this.running = true;
  }
  if ( c.keyIsPressed(KEY_A) ) {
    this.vel.x = -7
    this.direction = -1;
    this.running = true;
  }

  if ( c.keyIsPressed(KEY_SPACE) && this.canJump ) {
    this.canJump = false;
    this.vel.add(new Vector(0, -50*0.7))
  };

}

Player.prototype.render = function() {
  this.sprite.update();
  this.spriteRun.update();
  this.spriteJump.update();
  
  c.push();

  // console.log(this.direction)
  c.ctx.translate(this.pos.x, this.pos.y);
  if(this.direction === -1) {
    c.ctx.scale(-1,1);
  }

  if(this.running === true) {
    c.image(
      this.spriteRun.img,
      this.spriteRun.sx, this.spriteRun.sy, //src
      this.spriteRun.sw, this.spriteRun.sh, //src
      -this.spriteRun.dw/2, 0, //dist
      this.spriteRun.dw, this.spriteRun.dh //dist
    )
  } else if (this.running === false) {
    c.image(
      this.sprite.img,
      this.sprite.sx, this.sprite.sy, //src
      this.sprite.sw, this.sprite.sh, //src
      -this.spriteRun.dw/2, 0, //dist
      this.sprite.dw, this.sprite.dh //dist
    )
  }
  if (this.canJump === false) {
    c.image(
      this.spriteJump.img,
      this.spriteJump.sx, this.spriteJump.sy, //src
      this.spriteJump.sw, this.spriteJump.sh, //src
      -this.spriteJump.dw/2, 0, //dist
      this.spriteJump.dw, this.spriteJump.dh //dist
    )
  } 
  
  c.pop();
  
}