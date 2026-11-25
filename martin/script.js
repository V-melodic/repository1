
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

let width, height, particles;

//Mohl bych všechny proměné mimo mapu ale takhle je to přehlednější.
const CON = {
  count: 65, 
  minRadius: 1,
  maxRadius: 3.5,
  speedY: 0.4,
  speedX: 0.5,
  swaySpeed: 0.015,
  swayAmount: 0.1,
  color: '118, 146, 212',
  glowColor: '#a8d5ff'
};

function resize() {
  width = canvas.width = canvas.offsetWidth;
  height = canvas.height = canvas.offsetHeight;
}

class Particle {
  constructor() {
    this.reset(true);
  }

  reset(initial = false) {
    this.radius = Math.random() * (CON.maxRadius - CON.minRadius) + CON.minRadius;
    this.vy = (Math.random() * 0.5 + 0.2) * CON.speedY;
    this.vx = (Math.random() * 0.5 + 0.2) * CON.speedX;
    this.angle = Math.random() * Math.PI;
    this.maxAlpha = Math.random() * 0.6 + 0.2;
    this.alpha = Math.random() * this.maxAlpha;
    this.alpha = 0;
    this.fadeState = 1;
    if (initial) {
      this.x = Math.random() * width
      this.y = Math.random() * height;
      this.alpha = Math.random() * this.maxAlpha;
    } else {
      if (Math.random() < 0.5) {
        this.x = width * Math.random()
        this.y = height
        console.log("above")
      } else {
        this.y = height * Math.random()
        this.x = 0
        console.log("bottom")
      }

      this.alpha = 0;
    }
  }

  update() {
    this.y -= Math.cos(this.angle) * CON.swayAmount + this.vy;
    this.x += Math.sin(this.angle) * CON.swayAmount + this.vx ;

    this.alpha += 0.005 * this.fadeState;
    if (this.alpha >= this.maxAlpha) {
      this.fadeState = -1;
    }

    if (this.alpha <= 0.05) {
      this.fadeState = 1;
    }
    if (this.x > width + 4 || this.y < - 4) {
      this.reset();
    }
  }

  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    
    ctx.shadowBlur = 10;
    ctx.shadowColor = CON.glowColor;
    ctx.fillStyle = `rgba(${CON.color}, ${this.alpha})`;
    
    ctx.fill();
    ctx.restore();
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  particles.forEach(i => {
    i.update();
    i.draw();
  });
  requestAnimationFrame(animate);
}


function init() {
  resize();
  particles = Array.from({ length: CON.count }, () => new Particle());
  animate();
}

window.addEventListener('resize', resize);
init();

