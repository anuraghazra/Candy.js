function ParticleSystem(x, y, img) {
  this.origin = new Vector(x, y);
  this.particles = [];
  this.img = img;

  this.setOrigin = function(x, y) {
    this.origin.x = x;
    this.origin.y = y;
  }

  this.addParticle = function (x, y) {
    let p = undefined;
    if (x !== undefined && y !== undefined) {
      p = new Particle(x, y, this.radius, this.img);
    } else {
      p = new Particle(this.origin.x, this.origin.y, this.radius, this.img);
    }
    this.particles.push(p);
  }

  this.remove = function (i) {
    this.particles.splice(i, 1);
  }

  this.update = function () {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update();
      this.particles[i].render();
      this.particles[i].boundary();
      if (this.particles[i].isDead()) {
        this.remove(i);
      }
    }
  }
}