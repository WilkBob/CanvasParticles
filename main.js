const app = document.getElementById('app');

const canvas = document.createElement('canvas');

const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

let hue = 0;

app.appendChild(canvas);

window.addEventListener('resize', () => {
  width = canvas.width =  window.innerWidth;
  height = canvas.height = window.innerHeight;
})

  

  class Particle {
    constructor(x, y, size, color) {
      this.x = x;
      this.y = y;
      this.size = size;
      this.color = color;
      this.baseX = this.x;
      this.baseY = this.y;
      this.density = Math.random() * 40 + 5;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    update() {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = getDistance(mouse.x, mouse.y, this.x, this.y);
      let baseDistance = getDistance(this.baseX, this.baseY, this.x, this.y);
      let forceDirectionX = dx / distance;
      let forceDirectionY = dy / distance;
      let maxDistance = mouse.radius;
      let force = (maxDistance - distance) / maxDistance;
      let directionX = forceDirectionX * force * this.density;
      let directionY = forceDirectionY * force * this.density;  
      this.color = `hsl(${ hue + baseDistance + force}, 60%, 60%)`;
      if (distance < mouse.radius) {
        this.x -= directionX;
        this.y -= directionY;
      } else {
        
        if (this.x !== this.baseX) {
          let dx = this.x - this.baseX;
          this.x -= dx / 20;
        }
        if (this.y !== this.baseY) {
          let dy = this.y - this.baseY;
          this.y -= dy / 20;
        }


      }
      
      this.baseX = this.baseX + this.size / 20;
      if (this.baseX > width) {
        this.baseX = 0;
        this.x = 0;
      }

    }
    
  }

  const particles = [];

  const mouse = {
    x: null,
    y: null,
    radius: 150
  };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  }
  );



  const getDistance = (x1, y1, x2, y2) => {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  };

  function update() {
    
    ctx.clearRect(0, 0, width, height);
    particles.forEach(particle => {
      particle.draw();
      particle.update();
    });
    
   
  }

  function loop() {
    update();
    requestAnimationFrame(loop);
  }


  for (let i = 0; i < 1000; i++) {
    const size = Math.random() * 15 + 1;
    const x = Math.random() * (width - size * 2) + size;
    const y = Math.random() * (height - size * 2) + size;
    const color = `blue`;
    particles.push(new Particle(x, y, size, color));
  }
 
    loop();
    window.addEventListener('touchstart', (e) => {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
  });
  
  window.addEventListener('touchmove', (e) => {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
  });
  
  window.addEventListener('touchend', () => {
      mouse.x = null;
      mouse.y = null;
  });