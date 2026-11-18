/**
 * Game 2: Master Pizza Pecahan Interaktif
 * Visualisasi pecahan dengan potongan pizza interaktif
 */

const PecahanPizzaGame = {
  score: 0,
  currentRound: 0,
  maxRounds: 6,
  targetNumerator: 1,
  targetDenominator: 4,
  selectedSlices: [],
  customerEmoji: '🐻',

  start() {
    this.score = 0;
    this.currentRound = 0;

    const gameContainer = document.getElementById('game-screen');
    gameContainer.innerHTML = `
      <div class="game-hud">
        <div class="hud-item">
          <button class="icon-btn" onclick="App.showScreen('home-screen')" title="Kembali ke Menu">🏠</button>
          <span class="hud-badge hud-score">⭐ Skor: <span id="game-score">0</span></span>
        </div>
        <div class="hud-item">
          <span class="hud-badge hud-timer">🍕 Ronde: <span id="pizza-round">1</span>/6</span>
        </div>
      </div>

      <div class="question-container">
        <div class="question-badge-topic">Pecahan Lezat</div>
        <div style="font-size: 3rem; margin: 6px 0;" id="customer-avatar">🐻</div>
        <p class="question-prompt" id="customer-order">Pesanan: Tolong siapkan 1/4 bagian pizza!</p>

        <div class="pizza-container">
          <div class="pizza-fraction-display">
            <span class="fraction-num" id="display-num">1</span>
            <span class="fraction-den" id="display-den">4</span>
          </div>

          <div class="pizza-svg-wrap" id="pizza-svg-container"></div>
          <p style="font-size:0.9rem; color:#64748b; font-weight:700;">👆 Klik atau sentuh potongan pizza untuk memilih!</p>
        </div>
      </div>

      <div class="feedback-box" id="feedback-box"></div>

      <div style="display:flex; justify-content:center; gap:16px;">
        <button class="btn btn-secondary btn-lg" onclick="PecahanPizzaGame.resetSelection()">🔄 Ulangi Pilihan</button>
        <button class="btn btn-success btn-lg" onclick="PecahanPizzaGame.submitOrder()">✅ Sajikan Pesanan!</button>
      </div>
    `;

    App.showScreen('game-screen');
    this.nextRound();
  },

  nextRound() {
    if (this.currentRound >= this.maxRounds) {
      this.endGame();
      return;
    }

    this.currentRound++;
    document.getElementById('pizza-round').textContent = this.currentRound;

    const customers = [
      { e: '🐻', name: 'Beruang' },
      { e: '🐰', name: 'Kelinci' },
      { e: '🐱', name: 'Kucing' },
      { e: '🐼', name: 'Panda' },
      { e: '🦁', name: 'Singa' },
      { e: '🦊', name: 'Rubah' }
    ];
    const customer = customers[this.currentRound - 1] || customers[0];

    // Variasi pecahan: 2, 3, 4, 6, 8 bagian
    const possibleDenominators = [2, 3, 4, 6, 8];
    this.targetDenominator = possibleDenominators[QuizEngine.randInt(0, possibleDenominators.length - 1)];
    this.targetNumerator = QuizEngine.randInt(1, this.targetDenominator - 1);
    this.selectedSlices = [];

    document.getElementById('customer-avatar').textContent = customer.e;
    document.getElementById('customer-order').innerHTML = `Halo koki cilik! Saya si <strong>${customer.name}</strong>, tolong ambilkan <strong>${this.targetNumerator}/${this.targetDenominator}</strong> bagian pizza ya!`;

    document.getElementById('display-num').textContent = this.targetNumerator;
    document.getElementById('display-den').textContent = this.targetDenominator;

    this.renderPizza();
    const fb = document.getElementById('feedback-box');
    fb.className = 'feedback-box';
    fb.style.display = 'none';
  },

  renderPizza() {
    const container = document.getElementById('pizza-svg-container');
    const total = this.targetDenominator;
    const radius = 100;
    const center = 110;

    let slicesSvg = '';
    const angleStep = (2 * Math.PI) / total;

    for (let i = 0; i < total; i++) {
      const startAngle = i * angleStep - Math.PI / 2;
      const endAngle = (i + 1) * angleStep - Math.PI / 2;

      const x1 = center + radius * Math.cos(startAngle);
      const y1 = center + radius * Math.sin(startAngle);
      const x2 = center + radius * Math.cos(endAngle);
      const y2 = center + radius * Math.sin(endAngle);

      const largeArc = (endAngle - startAngle > Math.PI) ? 1 : 0;
      const d = `M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

      const isSelected = this.selectedSlices.includes(i);
      const fillColor = isSelected ? '#ef4444' : '#f59e0b';
      const strokeColor = '#b45309';

      // Posisi topping pepperoni di tengah irisan
      const midAngle = startAngle + angleStep / 2;
      const tx = center + (radius * 0.55) * Math.cos(midAngle);
      const ty = center + (radius * 0.55) * Math.sin(midAngle);

      slicesSvg += `
        <path d="${d}" fill="${fillColor}" stroke="${strokeColor}" stroke-width="3"
              style="cursor: pointer; transition: all 0.2s;"
              onclick="PecahanPizzaGame.toggleSlice(${i})" />
        <circle cx="${tx}" cy="${ty}" r="8" fill="#b91c1c" pointer-events="none" />
      `;
    }

    container.innerHTML = `
      <svg width="220" height="220" viewBox="0 0 220 220">
        <!-- Pinggiran kerak pizza -->
        <circle cx="${center}" cy="${center}" r="${radius + 6}" fill="#d97706" />
        <!-- Irisan pizza -->
        ${slicesSvg}
        <!-- Pusat pizza -->
        <circle cx="${center}" cy="${center}" r="7" fill="#78350f" />
      </svg>
    `;
  },

  toggleSlice(index) {
    soundManager.playClick();
    const idx = this.selectedSlices.indexOf(index);
    if (idx > -1) {
      this.selectedSlices.splice(idx, 1);
    } else {
      this.selectedSlices.push(index);
    }
    this.renderPizza();
  },

  resetSelection() {
    soundManager.playClick();
    this.selectedSlices = [];
    this.renderPizza();
  },

  submitOrder() {
    const fb = document.getElementById('feedback-box');
    const selectedCount = this.selectedSlices.length;

    if (selectedCount === this.targetNumerator) {
      soundManager.playCorrect();
      this.score += 100;
      document.getElementById('game-score').textContent = this.score;

      fb.className = 'feedback-box show feedback-success';
      fb.innerHTML = `🎉 <strong>Tepat Sekali!</strong> Kamu memilih ${selectedCount}/${this.targetDenominator} potong. Pelanggan sangat senang! (+100 poin)`;

      setTimeout(() => {
        this.nextRound();
      }, 2000);
    } else {
      soundManager.playWrong();
      fb.className = 'feedback-box show feedback-error';
      fb.innerHTML = `💡 <strong>Sedikit lagi!</strong> Kamu memilih <strong>${selectedCount}/${this.targetDenominator}</strong> potong, padahal pesanan adalah <strong>${this.targetNumerator}/${this.targetDenominator}</strong> potong. Coba sesuaikan ya!`;
    }
  },

  endGame() {
    soundManager.playVictory();
    let stars = 1;
    if (this.score >= 500) stars = 3;
    else if (this.score >= 300) stars = 2;

    App.saveGameResult('pecahan-pizza', this.score, stars);

    App.showResultModal({
      title: "🍕 Koki Pecahan Terhebat!",
      score: this.score,
      stars: stars,
      desc: `Luar biasa! Semua pesanan pizza pecahan berhasil kamu sajikan dengan sempurna!`,
      replayAction: () => this.start()
    });
  }
};
