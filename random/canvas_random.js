var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// Make a rectanggle
// c.fillRect (x, y, width, height)
// c.fillStyle = 'rgba(255, 0, 0, 0.5)'
// c.fillRect (0, 100, 100, 100)
// c.fillStyle = 'rgba(100, 0, 0, 0.5)'
// c.fillRect (200, 100, 100, 100)
// c.fillStyle = 'rgba(255, 0, 255, 0.5)'
// c.fillRect (100, 200, 100, 100)
// c.fillStyle = 'rgba(0, 255, 0, 0.5)'
// c.fillRect (100, 400, 200, 100)
// console.log(canvas);

// line
// c.beginPath();
// c.moveTo (50, 300);
// c.lineTo (300, 100);
// c.lineTo (400, 300);
// c.strokeStyle = "#fa34a3"
// c.stroke();

// Arc / Circle
// for (var i = 0; i < 100; i++) {
//   var x = Math.random() * window.innerWidth;
//   var y = Math.random() * window.innerHeight;
//
//   c.beginPath();
//   c.arc(x, y, 30 , 0, Math.PI*2, false);
//   c.strokeStyle = 'blue';
//   c.stroke();
// }

// Function to draw a circle
// var x = Math.random()*innerWidth;
// var y = Math.random()*innerHeight;
// var dx = (Math.random() - 0.5)*8;
// var dy = (Math.random() - 0.5)*6;
// var radius = 30;

var mouse = {
  x: undefined,
  y: undefined
}

var colorArray = [
  '#011C40',
  '#8AA6BF',
  '#DCE8F2',
  '#295773',
  '#A60D0D'
];

var maxRadius = 100;
var minRadius = 10;

window.addEventListener('mousemove', function (event){
  mouse.x = event.x
  mouse.y = event.y
})

window.addEventListener('resize', function (){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
})

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color = colorArray[Math.floor(Math.random()*colorArray.length)];

  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius , 0, Math.PI*2, false);
    // Remember to insert here the function of velocity
    // c.fillStyle = colorArray[Math.floor(Math.random()*colorArray.length)];
    c.fillStyle = this.color;
    c.fill();
    c.strokeStyle = 'black';
    c.stroke();
  }

  this.update = function(){
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0){
      this.dx = -this.dx
    }

    if (this.y + this.radius > innerWidth || this.y - this.radius < 0){
      this.dy = -this.dy
    }

    this.x += this.dx;
    this.y += this.dy;

    // interactivity
    if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
        mouse.y - this.y < 50 && mouse.y - this.y > -50) {
          if (this.radius < maxRadius) {
            this.radius += 1;
          }
    } else if(this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  }
}

var circleArray;

function init() {
  circleArray = [];

  for (var i = 0; i < 800; i++) {
    var radius = Math.random()*10 + 10;
    var x = Math.random()*(innerWidth - radius*2) + radius;
    var y = Math.random()*(innerHeight - radius*2) + radius;
    var dx = (Math.random() - 0.5)*8;
    var dy = (Math.random() - 0.5)*8;
    circleArray.push(new Circle(x, y, dx, dy, radius))
  }
}

function animate() {
  requestAnimationFrame (animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  for (var i = 0; i < circleArray.length; i++) {
    circleArray[i].update();
  }
}

init();
animate();
