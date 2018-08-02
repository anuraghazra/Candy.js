const c = new Candy();
c.createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT-90);


let angle1 = document.getElementById('angle1');
let angle2 = document.getElementById('angle2');
let slider1 = document.getElementById('leftTrunk');
let slider2 = document.getElementById('rightTrunk');
let size = document.getElementById('size');


function animate() {
  c.clear('rgba(25,25,25,1)');

  c.push();
  c.translate(CANVAS_WIDTH/2, CANVAS_HEIGHT);
  c.blendMode(ADD);
  branch(size.value);
  c.pop();

  c.loop(animate);
}
animate();

function branch(len) {
  c.stroke(['crimson', 'brown', 'black']);
  c.strokeWeight(len / 4);
  c.line(0, 0, 0, -len);
  c.translate(0, -len);

  if (len > 4) {
    c.push();
    c.rotate(angle1.value);
    branch(len * slider1.value);
    c.pop();
    c.push();
    c.rotate(-angle2.value);
    branch(len * slider2.value);
    c.pop();
  }
}

