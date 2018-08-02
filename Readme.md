# Candy.js
## Javascript Rendering Engine

JavaScript Canvas Rendering Engine Candy.js 

> Inspired by p5.js


## Getting Started
```javascript
  const c = new Candy();

  // c.createcanvas(width, height, appendTo:domElement) 
  c.createCanvas(800, 600);
  
  c.resize(true);

  
  function animate() {
    c.clear();

    c.rect(100, 100, 100, 100, 10);
    
    c.circle(100, 100, 20);

    c.loop(animate);
  }
  animate();
```


## Loading Assets
```javascript
  const c = new Candy();
  c.createCanvas(800, 600);

  let img = c.loadImage('path_to_img.png')
  function preload() {
    animate();
  }
  
  function animate() {
    c.clear();

    c.image(myImg, 0, 0, 200, 200);

    c.loop(animate);
  }
  animate();
```


### Utility Functions

> rgba(r, g, b, a)

> hsla(h, s, l, a)

> randomRGB()

> randomHSLA(a)


> norm(value, min, max)

> lerp(norm, min, max)

> map(value, sMin, sMax, dMin, dMax)

> dist(px, py, qx, qy)

    
> intersects(r1, r2)

> random(min, max)

> randomInt(min, max)

> clamp(value, min, max)


> tween(pos, target, speed)