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
  grid1.resize();
})



class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseX = this.x;
        this.baseY = this.y;
        this.color = `#fd5173`
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}

class Line {
    constructor(start, end) {
        this.start = start;
        this.end = end;
        this.color = `#ecbdbd`
    }
    

    draw() {
        ctx.beginPath();
        ctx.moveTo(this.start.x, this.start.y);
        ctx.lineTo(this.end.x, this.end.y);
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
}
//25 * 11 grid, meant to replicate my windows dekstop
class grid {
    constructor() {
        this.points = [];
        this.lines = [];
        this.cellWidth = width / 25;
        this.cellHeight = height / 11;
        this.createPoints();
    }

   createPoints() {
    for (let i = 0; i < 26; i++) {
        for (let j = 0; j < 12; j++) {
            const point = new Point(i * this.cellWidth, j * this.cellHeight);
            this.points.push(point);
            
        }
    }
}

    

    draw() {
        this.points.forEach(point => point.draw());
        this.lines.forEach(line => line.draw());
    }

    resize() {
        this.cellWidth = width / 25;
        this.cellHeight = height / 11;
        this.points = [];
        this.lines = [];
        this.createPoints();
    }

    update() {
        this.lines = [];
        const poly = [];
        for (let i = 0; i < this.points.length; i++){
            const dx = mouse.x - this.points[i].x;
            const dy = mouse.y - this.points[i].y;
            const distance = getDistance(mouse.x, mouse.y, this.points[i].x, this.points[i].y);
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const maxDistance = mouse.radius;
            const force = (maxDistance - distance) / maxDistance;
            const directionX = forceDirectionX * force * 2;
            const directionY = forceDirectionY * force * 2;

            if (distance < mouse.radius) {
                this.points[i].x -= directionX;
                this.points[i].y -= directionY;
                this.points[i].color = `#ffffff`;
                this.lines.push(new Line(this.points[i], {x: mouse.x, y: mouse.y}));
                poly.push(this.points[i]);
            } else {
                if (this.points[i].x !== this.points[i].baseX) {
                    const dx = this.points[i].x - this.points[i].baseX;
                    this.points[i].x -= dx / 20;
                    this.points[i].color = `#fd5173`;
                }
                if (this.points[i].y !== this.points[i].baseY) {
                    const dy = this.points[i].y - this.points[i].baseY;
                    this.points[i].y -= dy / 20;
                    this.points[i].color = `#fd5173`;
                }
            }
        }
        this.drawPolyWithLines(poly);
    }
    drawPolyWithLines(poly) {
        for (let i = 0; i < poly.length; i++) {
            if (i === poly.length - 1) {
                this.lines.push(new Line(poly[i], poly[0]));
            } else {
                this.lines.push(new Line(poly[i], poly[i + 1]));
            }
        }
    }


}
 

const grid1 = new grid();




  const mouse = {
    x: null,
    y: null,
    radius: 100
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
grid1.update();
grid1.draw();

  }

  function loop() {
    update();
    requestAnimationFrame(loop);
  }


  
 
loop();


