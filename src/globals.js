/**
 * @method rgba()
 * @global
 * @param {String|Number} r 
 * @param {String|Number?} g 
 * @param {String|Number?} b 
 * @param {String|Number?} a
 */
global.rgba = function(r, g, b, a) {
  if (g === undefined) g = r;
  if (b === undefined) b = r;
  if (a === undefined) a = 1;
  if (a > 1) { a = a / 255 };
  return 'rgba(' + clamp(r, 0, 255) + ',' + clamp(g, 0, 255) + ',' + clamp(b, 0, 255) + ',' + clamp(a, 0, 1) + ')'
}

/**
 * @method rgb()
 * @global
 * @param {String|Number} r 
 * @param {String|Number?} g 
 * @param {String|Number?} b
 */
global.rgb = function(r, g, b) {
  if (g === undefined) g = r;
  if (b === undefined) b = r;
  return 'rgb(' + clamp(r, 0, 255) + ',' + clamp(g, 0, 255) + ',' + clamp(b, 0, 255) + ')'
}

/**
 * @method hsla()
 * @global
 * @param {Number} h 
 * @param {Number} s 
 * @param {Number} l
 * @param {Number} a
 */
global.hsla = function(h, s, l, a) {
  return 'hsla(' + h + 'deg, ' + clamp(s, 0, 100) + '%, ' + clamp(l, 0, 100) + '%, ' + ((a === undefined) ? 1 : a) + ')';
};

/**
 * @method hsl()
 * @global
 * @param {Number} h 
 * @param {Number} s 
 * @param {Number} l
 */
global.hsl = function(h, s, l) {
  return 'hsl(' + h + 'deg, ' + clamp(s, 0, 100) + '%, ' + clamp(l, 0, 100) + '%)';
};

/**
 * @method randomRGB()
 * @global
 * @param {Number?} _r
 * @param {Number?} _g 
 * @param {Number?} _g
 */
global.randomRGB = function(_r, _g, _b) {
  let r = randomInt(_r || 255);
  let g = randomInt(_g || 255);
  let b = randomInt(_b || 255);
  return rgb(r, g, b)
}

/**
 * @method randomHSLA()
 * @global
 * @param {Number?} _h
 * @param {Number?} _s
 * @param {Number?} _l
 * @param {Number?} _a 
 */
global.randomHSLA = function(_h, _s, _l, _a) {
  let h = randomInt(_h || 360);
  let s = randomInt(_s || 100);
  let l = randomInt(_l || 100);
  let a = (_a === undefined) ? 1 : _a;
  return hsla(h, s, l, a);
}

/**
 * @method radians()
 * @global
 * @param {Number?} a
 */
global.radians = function radians(a) {
  return a * Math.PI/180;
}

/**
 * @method norm()
 * @global
 * @param {Number} value
 * @param {Number} min
 * @param {Number} max
 */
global.norm = function(value, min, max) {
  return (value - min) / (max - min);
}

/**
 * @method lerp()
 * @global
 * @param {Number} value
 * @param {Number} min
 * @param {Number} max
 */
global.lerp = function(norm, min, max) {
  return (max - min) * norm + min;
}

/**
 * @method map()
 * @global
 * @param {Number} value
 * @param {Number} sMin
 * @param {Number} sMax
 * @param {Number} dMin
 * @param {Number} dMax
 */
global.map = function(value, sMin, sMax, dMin, dMax) {
  return this.lerp(this.norm(value, sMin, sMax), dMin, dMax)
}

/**
 * @method dist()
 * @global
 * @param {Number} px
 * @param {Number} py
 * @param {Number} qx
 * @param {Number} qy
 */
global.dist = function(px, py, qx, qy) {
  let dx = px - qx;
  let dy = py - qy;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * @method random()
 * @global
 * @param {Number} min
 * @param {Number} max
 */
global.random = function(min, max) {
  if (max === undefined) {
    return Math.random() * (min === undefined ? 1 : min);
  } else {
    return min + Math.random() * (max - min);
  }
}

/**
 * @method randomInt()
 * @global
 * @param {Number} min
 * @param {Number} max
 */
global.randomInt = function(min, max) {
  return Math.floor(random(min, max))
}

/**
 * @method clamp()
 * @global
 * @param {Number} value
 * @param {Number} min
 * @param {Number} max
 */
global.clamp = function(value, min, max) {
  return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
}

/**
 * @method tween()
 * @global
 * @param {Number} pos
 * @param {Number} target
 * @param {Number} speed
 */
global.tween = function(pos, target, speed) {
  if (speed == undefined) speed = 20;
  pos += (target - pos) / speed;
  return pos;
}

/**
 * @method checkType()
 * @global
 * @param {*} value
 * @param {*} type
 */
global.checkType = function(value, type) {
  if (value === undefined) { return };
  if (typeof value === 'object') {
    let checkObjects = value.constructor.toString().toLowerCase().indexOf(type + '()');
    if (checkObjects === -1) {
      throw ('Type Cheking Error : (' + (typeof value) + ' ' + value + ')' + ' is not typeof ' + type)
    } else {
      return value;
    }
  } else {
    if (typeof value !== type) {
      throw ('Type Cheking Error : (' + (typeof value) + ' ' + value + ')' + ' is not typeof ' + type)
    } else {
      return value;
    }
  }
}

/**
 * @method optional()
 * @global
 * @param {*} value
 * @param {*} optValue
 */
global.optional = function(value, optValue) {
  if (value === undefined) {
    value = optValue
  };
  return value;
}



/**
 *
 * @method intersects()
 * @param {Object} r1
 * @param {Object} r2
 * @returns {Boolean} !collides
 */
global.intersects = function(r1, r2) {
  let r1x = r1.x;
  let r1xw = r1.x + r1.width;
  let r1y = r1.y;
  let r1yh = r1.y + r1.height;

  let r2x = r2.x;
  let r2xw = r2.x + r2.width;
  let r2y = r2.y;
  let r2yh = r2.y + r2.height;

  if (!r1.width || !r1.height) {
    r1xw = r1.x;
    r1yh = r1.y;
    // console.log('rect1 is a point');
  }
  if (!r2.width || !r2.height) {
    r2xw = r2.x;
    r2yh = r2.y;
    // console.log('rect2 is a point');
  }
  if ((!r1.width || !r1.height) && (!r2.width || !r2.height)) {
    // console.log('Cant Resolve Both Objects As Point');
  }
  return !(
    r2x >= r1xw ||
    r1x >= r2xw ||
    r2y >= r1yh ||
    r1y >= r2yh
  )
}



/**
 * GLOBAL VARIABLES
 */

// Mouse Listeners //
global.mouseX = 0;
global.mouseY = 0;
global.mouseDown = false;
window.addEventListener('mousemove', function (e) {
  global.mouseX = e.offsetX;
  global.mouseY = e.offsetY;
});
window.addEventListener('mousedown', function () {
  global.mouseDown = true;
});
window.addEventListener('mouseup', function () {
  global.mouseDown = false;
});

// Keyboard Listeners //
global.CURRENT_KEYS = {};
global.KEY_W = 87;
global.KEY_A = 65;
global.KEY_S = 83;
global.KEY_D = 68;
global.KEY_SPACE = 32;

global.ARROW_UP = 38;
global.ARROW_DOWN = 40;
global.ARROW_LEFT = 37;
global.ARROW_RIGHT = 39;
window.addEventListener('keydown', function (e) {
  global.code = e.keyCode || e.which;
  global.CURRENT_KEYS[code] = true;
  if (window.onKeyPressed) {
    global.onKeyPressed(code, e);
  }
})
window.addEventListener('keyup', function (e) {
  global.code = e.keyCode || e.which;
  global.CURRENT_KEYS[code] = false;
})



global.CANVAS_WIDTH = 0;
global.CANVAS_HEIGHT = 0;
global.WINDOW_WIDTH = 0;
global.WINDOW_HEIGHT = 0;
function getWindowSize() {
  global.WINDOW_WIDTH = window.innerWidth - 6;
  global.WINDOW_HEIGHT = window.innerHeight - 6;
}
getWindowSize();
window.addEventListener('resize', getWindowSize);



// BlendModes
global.ADD = 'lighter';
global.DIFFERENCE = 'difference';
global.EXCLUSION = 'exclusion';
global.SCREEN = 'screen';
global.XOR = 'xor';
global.COPY = 'copy';

global.SRC_OVER = 'source-over';
global.SRC_OUT = 'source-out';
global.SRC_IN = 'source-in';
global.SRC_TOP = 'source-atop';

global.DEST_OVER = 'destination-over';
global.DEST_OUT = 'destination-out';
global.DEST_IN = 'destination-in';
global.DEST_TOP = 'destination-atop';

// TEXT
global.CENTER = 'center';
global.MIDDLE = 'middle';
global.CORNER = 'corner';