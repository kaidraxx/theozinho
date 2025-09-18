const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const hearts = [];
const colors = ['#8B0000', '#ffffff', '#000000']; // vinho, branco, preto

class Heart {
  constructor(x, y, size, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.speedX = speedX;
    this.speedY = speedY;
    this.opacity = 1;
  }

  draw() {
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.x + this.size / 2, this.y - this.size,
                      this.x + this.size * 1.5, this.y + this.size / 3,
                      this.x, this.y + this.size * 1.5);
    ctx.bezierCurveTo(this.x - this.size * 1.5, this.y + this.size / 3,
                      this.x - this.size / 2, this.y - this.size,
                      this.x, this.y);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.opacity -= 0.005;
  }
}

function spawnHeart(x, y) {
  const size = Math.random() * 12 + 6;
  const speedX = (Math.random() - 0.5) * 1;
  const speedY = (Math.random() - 1.5) * 2;
  hearts.push(new Heart(x, y, size, speedX, speedY));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach((heart, index) => {
    heart.update();
    heart.draw();
    if (heart.opacity <= 0) {
      hearts.splice(index, 1);
    }
  });
  requestAnimationFrame(animate);
}

// Spawn aleatório de corações flutuando
setInterval(() => {
  for (let i = 0; i < 5; i++) {
    const x = Math.random() * canvas.width;
    const y = canvas.height + 50;
    spawnHeart(x, y);
  }
}, 150);

// Corações que seguem o mouse
canvas.addEventListener('mousemove', (e) => {
  for (let i = 0; i < 6; i++) {
    spawnHeart(e.clientX, e.clientY);
  }
});

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

animate();