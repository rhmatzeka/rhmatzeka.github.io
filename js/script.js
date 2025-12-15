// Typing Effect
const typingText = document.querySelector('.typing-text');
const text = " Rahmat Eka Satria!";
let i = 0;
function typeWriter() {
    if (i < text.length) {
        typingText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 150);
    } else {
        typingText.style.borderRight = "none";
    }
}
setTimeout(typeWriter, 1000);

// BACKGROUND PARTIKEL — 100% PERSIS DENGAN KODE PERTAMA KAMU
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let mouse = { x: canvas.width / 2, y: canvas.height / 2 };

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    mouse.x = canvas.width / 2;
    mouse.y = canvas.height / 2;
});
window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});
window.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    mouse.x = touch.clientX;
    mouse.y = touch.clientY;
});

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.hue = 180 + Math.random() * 60;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.life = 1;
    }
    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let dist = Math.hypot(dx, dy);
        let maxDist = 120;
        let force = (maxDist - dist) / maxDist;

        if (dist < maxDist) {
            this.vx += dx * 0.08 * force;
            this.vy += dy * 0.08 * force;
            this.opacity = Math.min(1, this.opacity + 0.02);
        } else {
            this.vx += (Math.random() - 0.5) * 0.02;
            this.vy += (Math.random() - 0.5) * 0.02;
            this.opacity *= 0.99;
        }

        this.vx *= 0.92;
        this.vy *= 0.92;
        this.x += this.vx;
        this.y += this.vy;

        if (this.x > canvas.width || this.x < 0) this.vx *= -1;
        if (this.y > canvas.height || this.y < 0) this.vy *= -1;

        if (this.opacity < 0.1) this.reset();
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = `hsl(${this.hue}, 80%, 60%)`;
        ctx.shadowColor = `hsl(${this.hue}, 100%, 70%)`;
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        particles.forEach(other => {
            let dx = this.x - other.x;
            let dy = this.y - other.y;
            let dist = Math.hypot(dx, dy);
            if (dist < 80) {
                ctx.strokeStyle = `hsla(${this.hue}, 70%, 50%, ${1 - dist / 80})`;
                ctx.lineWidth = 1.5 - dist / 80;
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(other.x, other.y);
                ctx.stroke();
            }
        });

        let dxm = this.x - mouse.x;
        let dym = this.y - mouse.y;
        let distMouse = Math.hypot(dxm, dym);
        if (distMouse < 100) {
            ctx.strokeStyle = `hsla(${this.hue}, 90%, 70%, ${1 - distMouse / 100})`;
            ctx.lineWidth = 2;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
            ctx.setLineDash([]);
        }
    }
}

const particles = [];
for (let i = 0; i < 250; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.fillStyle = 'rgba(5, 5, 20, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.shadowColor = 'hsl(200, 100%, 60%)';
    ctx.shadowBlur = 30;
    let gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 60);
    gradient.addColorStop(0, 'hsla(200, 100%, 60%, 0.6)');
    gradient.addColorStop(0.5, 'hsla(200, 100%, 60%, 0.3)');
    gradient.addColorStop(1, 'hsla(200, 100%, 60%, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 60, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    requestAnimationFrame(animate);
}

// Hamburger + Skill Bar + Scroll + Modal
document.getElementById('menuBtn').addEventListener('click', () => document.getElementById('mobileMenu').classList.remove('hidden'));
document.getElementById('closeMenu').addEventListener('click', () => document.getElementById('mobileMenu').classList.add('hidden'));
document.querySelectorAll('#mobileMenu a').forEach(a => a.addEventListener('click', () => document.getElementById('mobileMenu').classList.add('hidden')));
gsap.utils.toArray('.skill-card').forEach(card => {
  ScrollTrigger.create({
    trigger: card,
    start: 'top 80%',
    onEnter: () => gsap.to(card.querySelector('.skill-bar'), { width: card.querySelector('.skill-bar').dataset.width, duration: 2, ease: 'power2.out' })
  });
});
document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); document.querySelector(a.getAttribute('href')).scrollIntoView({ behavior: 'smooth' }); }));
function openModal(id) { document.getElementById('modalContent').innerHTML = '<h2 class="text-4xl font-bold text-cyan-400 mb-6">Detail Project</h2><p>Coming soon...</p>'; document.getElementById('projectModal').classList.remove('hidden'); }
function closeModal() { document.getElementById('projectModal').classList.add('hidden'); }
document.getElementById('projectModal').addEventListener('click', e => { if (e.target.id === 'projectModal') closeModal(); });
document.querySelector('form').addEventListener('submit', e => { e.preventDefault(); alert('Pesan terkirim!'); });

// === INFINITE CAROUSEL SMOOTH & LOOPING ===

// Fungsi umum untuk carousel
function setupCarousel(carouselClass, prevBtnClass, nextBtnClass) {
  const carousel = document.querySelector(carouselClass);
  const items = carousel.querySelectorAll(':scope > div:not(.clone)');
  const totalItems = items.length;

  if (totalItems <= 1) return; // Jika hanya 1 item, tidak perlu carousel

  // Duplikat item terakhir di awal & item pertama di akhir untuk infinite loop
  const firstItem = items[0].cloneNode(true);
  const lastItem = items[totalItems - 1].cloneNode(true);
  firstItem.classList.add('clone');
  lastItem.classList.add('clone');

  carousel.appendChild(firstItem); // duplikat pertama di akhir (sudah ada di HTML)
  carousel.insertBefore(lastItem, items[0]); // duplikat terakhir di awal

  let currentIndex = 1; // mulai dari 1 karena ada clone di awal
  const itemWidth = items[0].offsetWidth + 40; // 40 = gap-10 (10*4)

  // Set posisi awal
  carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

  // Geser ke kiri (next)
  document.querySelector(nextBtnClass).addEventListener('click', () => {
    currentIndex++;
    carousel.style.transition = 'transform 0.7s ease-in-out';
    carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

    // Jika sampai ke clone pertama di akhir
    if (currentIndex === totalItems + 1) {
      setTimeout(() => {
        carousel.style.transition = 'none';
        currentIndex = 1;
        carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
      }, 700);
    }
  });

  // Geser ke kanan (prev)
  document.querySelector(prevBtnClass).addEventListener('click', () => {
    currentIndex--;
    carousel.style.transition = 'transform 0.7s ease-in-out';
    carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;

    // Jika sampai ke clone terakhir di awal
    if (currentIndex === 0) {
      setTimeout(() => {
        carousel.style.transition = 'none';
        currentIndex = totalItems;
        carousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
      }, 700);
    }
  });
}

// Inisialisasi kedua carousel
// Tunggu sampai semua gambar selesai loading, baru jalankan carousel dan partikel
window.addEventListener('load', function() {
  // Setup carousel setelah semua aman
  setupCarousel('.projects-carousel', '.prev-project', '.next-project');
  setupCarousel('.certificates-carousel', '.prev-cert', '.next-cert');
  
  // Pastikan canvas ukurannya benar
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Jalankan animasi partikel
  animate();
});