/**
 * Petualangan Matematika Ceria SD/MI
 * Master App Controller, State Management, Badges, Modals, & Confetti System
 */

const App = {
  activeScreen: 'home-screen',
  selectedFase: 'all', // 'all', 'fase-a', 'fase-b', 'fase-c'
  userData: {
    name: 'Siswa Juara',
    scores: {},
    stars: {},
    badges: []
  },

  init() {
    this.loadUserData();
    this.renderHeaderInfo();
    this.renderMaterialCards();
    this.renderBadges();
    this.setupConfetti();
    this.filterGames('all');
  },

  // Simpan & Muat data siswa dari LocalStorage
  loadUserData() {
    try {
      const saved = localStorage.getItem('math_quest_sd_user');
      if (saved) {
        this.userData = { ...this.userData, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn("Storage error:", e);
    }
  },

  saveUserData() {
    try {
      localStorage.setItem('math_quest_sd_user', JSON.stringify(this.userData));
    } catch (e) {
      console.warn("Storage save error:", e);
    }
    this.renderHeaderInfo();
  },

  // Simpan skor game dan periksa lencana
  saveGameResult(gameId, score, stars) {
    const curScore = this.userData.scores[gameId] || 0;
    if (score > curScore) {
      this.userData.scores[gameId] = score;
    }

    const curStars = this.userData.stars[gameId] || 0;
    if (stars > curStars) {
      this.userData.stars[gameId] = stars;
    }

    // Periksa pembukaan lencana
    if (!this.userData.badges.includes(gameId)) {
      this.userData.badges.push(gameId);
    }

    // Periksa total bintang untuk lencana master
    const totalStars = Object.values(this.userData.stars).reduce((a, b) => a + b, 0);
    if (totalStars >= 12 && !this.userData.badges.includes('master-matematika')) {
      this.userData.badges.push('master-matematika');
    }

    this.saveUserData();
  },

  renderHeaderInfo() {
    const nameEl = document.getElementById('user-profile-name');
    if (nameEl) nameEl.textContent = this.userData.name;

    const totalStars = Object.values(this.userData.stars).reduce((a, b) => a + b, 0);
    const starEl = document.getElementById('user-total-stars');
    if (starEl) starEl.textContent = totalStars;

    // Update bintang pada kartu game di beranda
    ['hitung-cepat', 'pecahan-pizza', 'warung-rupiah', 'bangun-datar', 'jam-waktu', 'versus'].forEach(id => {
      const el = document.getElementById(`stars-${id}`);
      if (el) {
        const count = this.userData.stars[id] || 0;
        let str = '';
        for (let i = 0; i < 3; i++) {
          str += i < count ? '⭐' : '☆';
        }
        el.textContent = str;
      }
    });
  },

  changeStudentName() {
    const current = this.userData.name || 'Siswa Juara';
    const newName = prompt("Masukkan Nama Siswa:", current);
    if (newName && newName.trim() !== '') {
      this.userData.name = newName.trim();
      this.saveUserData();
      this.renderHeaderInfo();
    }
  },

  showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add('active');
      this.activeScreen = screenId;
      window.scrollTo(0, 0);
    }
  },

  filterGames(fase) {
    this.selectedFase = fase;
    document.querySelectorAll('.grade-pill').forEach(btn => {
      if (btn.dataset.fase === fase) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const cards = document.querySelectorAll('.game-card');
    cards.forEach(card => {
      const cardFase = card.dataset.fase;
      if (fase === 'all' || cardFase.includes(fase) || cardFase === 'all') {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  },

  // Buka materi pembelajaran
  renderMaterialCards() {
    const container = document.getElementById('materials-list');
    if (!container) return;
    container.innerHTML = '';

    STUDY_MATERIALS.forEach(item => {
      const card = document.createElement('div');
      card.className = 'material-card';
      card.innerHTML = `
        <div class="material-header" onclick="this.parentElement.classList.toggle('open')">
          <span style="display:flex; align-items:center; gap:10px;">
            <span style="font-size:1.6rem;">${item.icon}</span>
            <span>
              <strong>${item.title}</strong>
              <small style="display:block; color:#64748b; font-size:0.75rem;">${item.grade}</small>
            </span>
          </span>
          <span style="font-size:1.2rem;">▼</span>
        </div>
        <div class="material-body">
          <p style="margin-bottom:12px; color:#475569; font-weight:700;">${item.summary}</p>
          ${item.content}
        </div>
      `;
      container.appendChild(card);
    });
  },

  // Buka Lencana & Trofi
  renderBadges() {
    const container = document.getElementById('badges-container');
    if (!container) return;
    container.innerHTML = '';

    const allBadges = [
      { id: 'hitung-cepat', icon: '⚡', name: 'Kilat Angka', desc: 'Selesaikan tantangan Hitung Kilat' },
      { id: 'pecahan-pizza', icon: '🍕', name: 'Master Pizza', desc: 'Sajikan pesanan pecahan pizza' },
      { id: 'warung-rupiah', icon: '🏪', name: 'Juragan Warung', desc: 'Belanja & hitung uang Rupiah' },
      { id: 'bangun-datar', icon: '📐', name: 'Detektif Bangun', desc: 'Tebak bangun datar & luas' },
      { id: 'jam-waktu', icon: '⏰', name: 'Pahlawan Waktu', desc: 'Membaca jam analog & durasi' },
      { id: 'versus', icon: '⚔️', name: 'Pendekar Duel', desc: 'Bermain mode versus bersama teman' },
      { id: 'master-matematika', icon: '👑', name: 'Juara Matematika', desc: 'Kumpulkan minimal 12 Bintang Emas' }
    ];

    allBadges.forEach(b => {
      const isUnlocked = this.userData.badges.includes(b.id);
      const div = document.createElement('div');
      div.className = `badge-item ${isUnlocked ? 'unlocked' : ''}`;
      div.innerHTML = `
        <div class="badge-icon">${isUnlocked ? b.icon : '🔒'}</div>
        <div class="badge-name">${b.name}</div>
        <div class="badge-desc">${b.desc}</div>
        <div style="font-size:0.75rem; font-weight:800; margin-top:4px; color:${isUnlocked ? '#059669' : '#94a3b8'};">
          ${isUnlocked ? '✓ Terbuka' : 'Terkunci'}
        </div>
      `;
      container.appendChild(div);
    });
  },

  // Modal Hasil & Kemenangan
  showResultModal({ title, score, stars, desc, replayAction }) {
    this.launchConfetti();

    let starsStr = '';
    for (let i = 0; i < 3; i++) {
      starsStr += i < stars ? '⭐' : '☆';
    }

    const modal = document.getElementById('result-modal');
    document.getElementById('result-title').textContent = title;
    document.getElementById('result-stars').textContent = starsStr;
    document.getElementById('result-score-val').textContent = score;
    document.getElementById('result-desc').textContent = desc;

    const replayBtn = document.getElementById('result-replay-btn');
    replayBtn.onclick = () => {
      this.closeModal('result-modal');
      if (replayAction) replayAction();
    };

    modal.classList.add('active');
  },

  // Piagam Penghargaan Digital
  openCertificateModal() {
    const modal = document.getElementById('cert-modal');
    document.getElementById('cert-name-display').textContent = this.userData.name;
    document.getElementById('cert-date').textContent = new Date().toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const totalStars = Object.values(this.userData.stars).reduce((a, b) => a + b, 0);
    document.getElementById('cert-stars-count').textContent = totalStars;

    modal.classList.add('active');
  },

  printCertificate() {
    window.print();
  },

  openModal(modalId) {
    const m = document.getElementById(modalId);
    if (m) m.classList.add('active');
  },

  closeModal(modalId) {
    const m = document.getElementById(modalId);
    if (m) m.classList.remove('active');
  },

  toggleSound() {
    const isMuted = soundManager.toggleMute();
    const btn = document.getElementById('sound-toggle-btn');
    if (btn) btn.textContent = isMuted ? '🔇' : '🔊';
  },

  toggleBgm() {
    const isPlaying = soundManager.toggleMusic();
    const btn = document.getElementById('bgm-toggle-btn');
    if (btn) btn.textContent = isPlaying ? '🎵 Musik: Nyala' : '🎵 Musik: Mati';
  },

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.log(err));
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  },

  // Partikel Confetti Canvas
  setupConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    this.confettiCanvas = canvas;
    this.confettiCtx = canvas.getContext('2d');
    this.confettiParticles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();
  },

  launchConfetti() {
    if (!this.confettiCanvas || !this.confettiCtx) return;
    const colors = ['#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6'];
    this.confettiParticles = [];

    for (let i = 0; i < 80; i++) {
      this.confettiParticles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.8) * 16,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        gravity: 0.35,
        opacity: 1
      });
    }

    const render = () => {
      this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
      let alive = false;

      this.confettiParticles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.012;

        if (p.opacity > 0) {
          alive = true;
          this.confettiCtx.save();
          this.confettiCtx.translate(p.x, p.y);
          this.confettiCtx.rotate((p.rotation * Math.PI) / 180);
          this.confettiCtx.fillStyle = p.color;
          this.confettiCtx.globalAlpha = Math.max(p.opacity, 0);
          this.confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
          this.confettiCtx.restore();
        }
      });

      if (alive) {
        requestAnimationFrame(render);
      } else {
        this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
      }
    };

    render();
  }
};

window.addEventListener('DOMContentLoaded', () => {
  App.init();
});
