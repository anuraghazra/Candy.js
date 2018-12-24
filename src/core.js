/**
 * Candy.js
 * @version v1.6.0
 * @description Easy to use canvas renderer similar to p5.Renderer
 * @constructor Candy()
 * @author Anurag Hazra <hazru.anurag@gmail.com>
 * @param {string?} canvas 
 * @param {Number?} width 
 * @param {Number?} height 
 */
function Candy(canvas, width, height) {
  // optional constructor
  if (!(this instanceof Candy)) {
    return new Candy(canvas);
  };

  if (canvas !== undefined) {
    if (typeof canvas === 'string') {
      this.canvas = document.querySelector(canvas);
    } else {
      this.canvas = canvas;
    }
    this.ctx = this.canvas.getContext('2d');
    this.width = width;
    this.height = height;
    this.canvas.width = CANVAS_WIDTH = this.width;
    this.canvas.height = CANVAS_HEIGHT = this.height;
  }

  // Variables
  this.idIndex = 0;
  this.screenBuffers = {};
  this.fireCallback = false;
  this.resCount = 0;
  // Rendering States
  this.doFill = true;
  this.doStroke = true;
  this.rectmode = 'CORNER';
  this.font = ['24px', 'Arial'];
  this.animateLoop = true;

  this.preload = function(){return null};


  this.trypreload();

  this._initCanvas();

}

/**
 * FUNCTIONAL PROTOTYPES /////////////////
 */

Candy.prototype.trypreload = function() {
  if (window.preload || this.preload) {
    var timer = window.setInterval(function () {
      if (this.resCount <= 0) {
        var time = (performance.now() / 1000).toFixed(2);
        console.log('%cAll Resources Loaded in ' + time + 's', 'color : green');
        ((window.preload === undefined) ? this.preload : window.preload)();
        window.clearInterval(timer);
        return;
      }
    }.bind(this), 10);
  }
}

/**
 * @method Candy.resize()
 * @param {Boolean} cull
 */
Candy.prototype.resize = function (cull) {
  window.addEventListener('resize', function () {
    this.resizeCanvas(this.canvas, cull);
  }.bind(this));
  this.resizeCanvas(this.canvas, cull);
}

/**
 * @method Candy.createCanvas()
 * @param {Number} w 
 * @param {Number} h 
 */
Candy.prototype.createCanvas = function (w, h) {
  this.canvas = document.createElement('canvas');
  this.canvas.id = 'CandyCanvas-' + this.idIndex;
  this.canvas.width = w || 200;
  this.canvas.height = h || 200;
  CANVAS_WIDTH = this.canvas.width;
  CANVAS_HEIGHT = this.canvas.height;
  this.ctx = this.canvas.getContext('2d');
  document.body.appendChild(this.canvas);

  this.index++;
  return this;
}

/**
 * @method Candy.createScreenBuffer()
 * @param {String} name 
 */
Candy.prototype.createScreenBuffer = function (name) {
  let canvas = document.createElement('canvas');
  canvas.id = 'CandyCanvasOffscreen-' + this.idIndex;
  canvas.width = this.canvas.width;
  canvas.height = this.canvas.height;
  // this.resizeCanvas(canvas);
  this.screenBuffers[name] = new Candy(canvas, canvas.width, canvas.height);
}

/**
 * @method Candy.putScreenBuffer()
 * @param {imageData} data 
 */
Candy.prototype.putScreenBuffer = function (data) {
  this.ctx.drawImage(data.canvas, 0, 0);
}

Candy.prototype._initCanvas = function () {
  window.addEventListener('DOMContentLoaded', function () {
    if (window.animate && this.fireCallback) {
      animate();
    }
  }.bind(this));
}

Candy.prototype.noLoop = function () {
  this.animateLoop = false;
}

/**
 * @method Candy.loop()
 * @param {Function} func 
 */
Candy.prototype.loop = function (func) {
  if (this.animateLoop) {
    if (window.animate) {
      return requestAnimationFrame(animate);
    } else {
      return requestAnimationFrame(func)
    }
  } else {
    this.animateLoop = true;
  }
  // return requestAnimationFrame(func);
}

/**
 * @method Candy.resizeCanvas()
 * @param {Element} canvas 
 * @param {Boolean} cull 
 */
Candy.prototype.resizeCanvas = function (canvas, cull) {
  let targetHeight = window.innerWidth * 9 / 16;

  if (window.innerHeight > targetHeight) {
    if (cull) {
      canvas.width = window.innerWidth;
      canvas.height = targetHeight;
    } else {
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = targetHeight + 'px';
    }
    canvas.style.left = '0px';
    canvas.style.top = (window.innerHeight - targetHeight) / 2 + 'px';
  } else {
    if (cull) {
      canvas.width = window.innerHeight * 16 / 9;
      canvas.height = window.innerHeight;
    } else {
      canvas.style.width = window.innerHeight * 16 / 9 + 'px';
      canvas.style.height = window.innerHeight + 'px';
    }
    canvas.style.left = (window.innerWidth - (canvas.width)) / 2 + 'px';
    canvas.style.top = '0px';
  }
}


global.Candy = Candy;
module.exports = Candy;
