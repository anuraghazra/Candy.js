/**
 * Global Utility
 */

rgba = function(r, g, b, a) {
  if (g === undefined) g = r;
  if (b === undefined) b = r;
  if (a === undefined) a = 1;
  if (a > 1) { a = a / 255 };
  return 'rgba(' + clamp(r, 0, 255) + ',' + clamp(g, 0, 255) + ',' + clamp(b, 0, 255) + ',' + clamp(a, 0, 1) + ')'
}

hsla = function(h, s, l, a) {
  return 'hsla(' + h + 'deg, ' + clamp(s, 0, 100) + '%, ' + clamp(l, 0, 100) + '%, ' + ((a === undefined) ? 1 : a) + ')';
};

randomRGB = function() {
  let r = randomInt(255);
  let g = randomInt(255);
  let b = randomInt(255);
  return rgba(r, g, b)
}

randomHSLA = function(a) {
  let h = randomInt(360);
  let s = randomInt(100);
  let l = randomInt(100);
  a = (a === undefined) ? 1 : a;
  return hsla(h, s, l, a);
}

norm = function(value, min, max) {
  return (value - min) / (max - min);
}

lerp = function(norm, min, max) {
  return (max - min) * norm + min;
}

map = function(value, sMin, sMax, dMin, dMax) {
  return this.lerp(this.norm(value, sMin, sMax), dMin, dMax)
}

dist = function(px, py, qx, qy) {
  let dx = px - qx;
  let dy = py - qy;
  return Math.sqrt(dx * dx + dy * dy);
}

random = function(min, max) {
  if (max === undefined) {
    return Math.random() * (min === undefined ? 1 : min);
  } else {
    return min + Math.random() * (max - min);
  }
}

randomInt = function(min, max) {
  return Math.floor(min + Math.random() * (((max === undefined) ? 0 : max) - min + 1))
}

clamp = function(value, min, max) {
  return Math.min(Math.max(value, Math.min(min, max)), Math.max(min, max));
}

tween = function(pos, target, speed) {
  if (speed == undefined) speed = 20;
  pos += (target - pos) / speed;
  return pos;
}

checkType = function(value, type) {
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

optional = function(value, optValue) {
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
intersects = function(r1, r2) {
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
mouseX = 0;
mouseY = 0;
mouseDown = false;
window.addEventListener('mousemove', function (e) {
  mouseX = e.offsetX;
  mouseY = e.offsetY;
});
window.addEventListener('mousedown', function () {
  mouseDown = true;
});
window.addEventListener('mouseup', function () {
  mouseDown = false;
});

// Keyboard Listeners //
CURRENT_KEYS = {};
KEY_W = 87;
KEY_A = 65;
KEY_S = 83;
KEY_D = 68;
KEY_SPACE = 32;

ARROW_UP = 38;
ARROW_DOWN = 40;
ARROW_LEFT = 37;
ARROW_RIGHT = 39;
window.addEventListener('keydown', function (e) {
  code = e.keyCode || e.which;
  CURRENT_KEYS[code] = true;
  if (window.onKeyPressed) {
    onKeyPressed(code, e);
  }
})
window.addEventListener('keyup', function (e) {
  code = e.keyCode || e.which;
  CURRENT_KEYS[code] = false;
})



CANVAS_WIDTH = 0;
CANVAS_HEIGHT = 0;
WINDOW_WIDTH = 0;
WINDOW_HEIGHT = 0;
function getWindowSize() {
  WINDOW_WIDTH = window.innerWidth - 6;
  WINDOW_HEIGHT = window.innerHeight - 6;
}
getWindowSize();
window.addEventListener('resize', getWindowSize);



// BlendModes
ADD = 'lighter';
DIFFERENCE = 'difference';
EXCLUSION = 'exclusion';
SCREEN = 'screen';
XOR = 'xor';
COPY = 'copy';

SRC_OVER = 'source-over';
SRC_OUT = 'source-out';
SRC_IN = 'source-in';
SRC_TOP = 'source-atop';

DEST_OVER = 'destination-over';
DEST_OUT = 'destination-out';
DEST_IN = 'destination-in';
DEST_TOP = 'destination-atop';

// TEXT
CENTER = 'center';
MIDDLE = 'middle';
CORNER = 'corner';