function Sprite(options) {
  this.tickCount = 0;
  this.frameIndex = 0;
  this.rowframeIndex = 0;
  this.ticksPerFrame = options.ticksPerFrame || 0;

  this.x = options.x || 0;
  this.y = options.y || 0;
  this.resizeBy = options.resizeBy || 1;

  this.cols = options.cols || 0;
  this.rows = options.rows || 1;

  this.img = options.img;
  this.width = options.width || this.img.naturalWidth;
  this.height = options.height || this.img.naturalHeight;

  this.recalcIn = false;
}

Sprite.prototype.recalc = function(options) {
  this.recalcIn = true;
  this.img = options.img;
  this.width = options.width || this.img.naturalWidth;
  this.height = options.height || this.img.naturalHeight;
  this.recalcIn = false;
}

Sprite.prototype.update = function () {
  if(this.recalcIn) return;

  this.tickCount++;

  if (this.tickCount > this.ticksPerFrame) {
    this.tickCount = 0;

    // increase the colums frame
    if (this.frameIndex < this.cols - 1) {
      this.frameIndex++;
    } else {
      // increase the rows frame if the colums frame reach max
      // and reset the frameIndex
      this.frameIndex = 0;
      if (this.rowframeIndex < this.rows - 1) {
        this.rowframeIndex++;
      } else {
        this.rowframeIndex = 0;
      }
    }
  }
  
  this.sx = this.frameIndex * this.width / this.cols;
  this.sy = this.rowframeIndex * this.height / this.rows;
  this.sw = this.width / this.cols;
  this.sh = this.height / this.rows;

  this.dx = this.x;
  this.dy = this.y;
  this.dw = (this.width / this.cols) / this.resizeBy;
  this.dh = (this.height / this.rows) / this.resizeBy;
}