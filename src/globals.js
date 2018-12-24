/**
 * Global Utility
 */

global.rgba = function(r, g, b, a) {
  if (g === undefined) g = r;
  if (b === undefined) b = r;
  if (a === undefined) a = 1;
  if (a > 1) { a = a / 255 };
  return 'rgba(' + clamp(r, 0, 255) + ',' + clamp(g, 0, 255) + ',' + clamp(b, 0, 255) + ',' + clamp(a, 0, 1) + ')'
}

global.hsla = function(h, s, l, a) {
  return 'hsla(' + h + 'deg, ' + clamp(s, 0, 100) + '%, ' + clamp(l, 0, 100) + '%, ' + ((a === undefined) ? 1 : a) + ')';
};

global.randomRGB = function() {
  let r = randomInt(255);
  let g = randomInt(255);
  let b = randomInt(255);
  return rgba(r, g, b)
}

global.randomHSLA = function(a) {
  let h = randomInt(360);
  let s = randomInt(100);
  let l = randomInt(100);
  a = (a === undefined) ? 1 : a;
  return hsla(h, s, l, a);
}

global.radians = function radians(a) {
  return a * Math.PI/180;
}

global.norm = function(value, min, max) {
  return (value - min) / (max - min);
}

global.lerp = function(norm, min, max) {
  return (max - min) * norm + min;
}

global.map = function(value, sMin, sMax, dMin, dMax) {
  return this.lerp(this.norm(value, sMin, sMax), dMin, dMax)
}

global.dist = function(px, py, qx, qy) {
  let dx = px - qx;
  let dy = py - qy;
  return Math.sqrt(dx * dx + dy * dy);
}

global.random = function(min, max) {
  if (max === undefined) {
    return Math.random() * (min === undefined ? 1 : min);
  } else {
    return min + Math.random() * (max - min);
  }
}

global.randomInt = function(min, max) {
  return Math.floor(min + Math.random() * (((max === undefined) ? 0 : max) - min + 1))
}

global.clamp = function(value, min, max) {
  return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
}

global.tween = function(pos, target, speed) {
  if (speed == undefined) speed = 20;
  pos += (target - pos) / speed;
  return pos;
}

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