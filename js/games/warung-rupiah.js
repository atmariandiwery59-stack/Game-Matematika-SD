/**
 * Game 3: Warung Pintar Nusantara
 * Belajar Nilai Uang Rupiah & Simulasi Belanja Warung
 */

const WarungRupiahGame = {
  score: 0,
  currentRound: 0,
  maxRounds: 5,
  targetAmount: 0,
  currentPayment: 0,
  selectedBills: [],
  gameMode: 'bayar-pas', // 'bayar-pas' atau 'kembalian'
  paidAmount: 0,

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
          <span class="hud-badge hud-timer">🏪 Transaksi: <span id="warung-round">1</span>/5</span>
        </div>
      </div>

      <div class="question-container">
        <div class="question-badge-topic" id="warung-topic">Warung Pintar</div>
        <p class="question-prompt" id="warung-prompt">Mari berbelanja di warung!</p>

        <!-- Rak Barang Warung -->
        <div class="warung-shelf" id="warung-shelf"></div>

        <!-- Nampan Kasir Pembayaran -->
        <div class="payment-tray">
          <div>
            <div style="font-size:0.9rem; color:#854d0e; font-weight:700;" id="tray-label">Total Uang di Nampan Kasir:</div>
            <div class="tray-total" id="tray-total-display">Rp 0</div>
          </div>
          <div style="display:flex; gap:10px;">
            <button class="btn btn-secondary" onclick="WarungRupiahGame.resetPayment()">🔄 Kosongkan</button>
            <button class="btn btn-success" onclick="WarungRupiahGame.submitPayment()">💰 Bayar Sekarang!</button>
          </div>
        </div>

        <div id="tray-bills-preview" style="display:flex; flex-wrap:wrap; gap:6px; min-height:36px; justify-content:center; margin-bottom:12px;"></div>
      </div>

      <!-- Dompet Uang Rupiah -->
      <div class="money-wallet">
        <div class="money-title">
          <span>👛 Dompet Uang Rupiah (Klik lembaran uang untuk memasukkan ke nampan):</span>
        </div>
        <div class="money-bills-row">
          <button class="money-bill bill-1k" onclick="WarungRupiahGame.addBill(1000)">
            <span>Rp 1.000</span>
          </button>
          <button class="money-bill bill-2k" onclick="WarungRupiahGame.addBill(2000)">
            <span>Rp 2.000</span>
          </button>
          <button class="money-bill bill-5k" onclick="WarungRupiahGame.addBill(5000)">
            <span>Rp 5.000</span>
          </button>
          <button class="money-bill bill-10k" onclick="WarungRupiahGame.addBill(10000)">
            <span>Rp 10.000</span>
          </button>
          <button class="money-bill bill-20k" onclick="WarungRupiahGame.addBill(20000)">
            <span>Rp 20.000</span>
          </button>
          <button class="money-bill bill-50k" onclick="WarungRupiahGame.addBill(50000)">
            <span>Rp 50.000</span>
          </button>
        </div>
      </div>

      <div class="feedback-box" id="feedback-box"></div>
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
    document.getElementById('warung-round').textContent = this.currentRound;
    this.resetPayment();

    const itemsCatalog = [
      { name: "Buku Tulis", icon: "📓", price: 3000 },
      { name: "Pensil Warna", icon: "✏️", price: 2000 },
      { name: "Penggaris", icon: "📏", price: 1000 },
      { name: "Kotak Bekal", icon: "🍱", price: 15000 },
      { name: "Susu Kotak", icon: "🧃", price: 5000 },
      { name: "Roti Cokelat", icon: "🍞", price: 4000 },
      { name: "Apel Segar", icon: "🍎", price: 6000 },
      { name: "Topi Sekolah", icon: "🧢", price: 10000 }
    ];

    // Acak 2 barang belanjaan
    const item1 = itemsCatalog[QuizEngine.randInt(0, 3)];
    const item2 = itemsCatalog[QuizEngine.randInt(4, itemsCatalog.length - 1)];
    const totalPrice = item1.price + item2.price;

    this.targetAmount = totalPrice;

    // Render Rak Barang
    const shelf = document.getElementById('warung-shelf');
    shelf.innerHTML = `
      <div class="item-card selected">
        <div class="item-icon">${item1.icon}</div>
        <div class="item-name">${item1.name}</div>
        <div class="item-price">Rp ${item1.price.toLocaleString('id-ID')}</div>
      </div>
      <div style="font-size:2rem; font-weight:900; color:#ea580c;">+</div>
      <div class="item-card selected">
        <div class="item-icon">${item2.icon}</div>
        <div class="item-name">${item2.name}</div>
        <div class="item-price">Rp ${item2.price.toLocaleString('id-ID')}</div>
      </div>
    `;

    document.getElementById('warung-prompt').innerHTML = `
      Kamu membeli <strong>${item1.name}</strong> dan <strong>${item2.name}</strong>.<br>
      Total Belanja: <span style="font-size:1.4rem; color:#c2410c; font-weight:900;">Rp ${totalPrice.toLocaleString('id-ID')}</span>.<br>
      Keluarkan uang dari dompet dengan jumlah yang pas ke nampan!
    `;

    const fb = document.getElementById('feedback-box');
    fb.className = 'feedback-box';
    fb.style.display = 'none';
  },

  addBill(val) {
    soundManager.playCoin();
    this.selectedBills.push(val);
    this.currentPayment += val;
    this.updateTray();
  },

  resetPayment() {
    this.selectedBills = [];
    this.currentPayment = 0;
    this.updateTray();
  },

  updateTray() {
    const display = document.getElementById('tray-total-display');
    if (display) {
      display.textContent = `Rp ${this.currentPayment.toLocaleString('id-ID')}`;
    }

    const preview = document.getElementById('tray-bills-preview');
    if (preview) {
      preview.innerHTML = '';
      this.selectedBills.forEach(v => {
        const tag = document.createElement('span');
        tag.className = 'hud-badge';
        tag.style.background = '#e2e8f0';
        tag.style.fontWeight = '800';
        tag.style.fontSize = '0.8rem';
        tag.textContent = `Rp ${v.toLocaleString('id-ID')}`;
        preview.appendChild(tag);
      });
    }
  },

  submitPayment() {
    const fb = document.getElementById('feedback-box');

    if (this.currentPayment === this.targetAmount) {
      soundManager.playCorrect();
      this.score += 100;
      document.getElementById('game-score').textContent = this.score;

      fb.className = 'feedback-box show feedback-success';
      fb.innerHTML = `🎉 <strong>Pintar Sekali!</strong> Uang yang kamu bayarkan pas Rp ${this.targetAmount.toLocaleString('id-ID')}! (+100 poin)`;

      setTimeout(() => {
        this.nextRound();
      }, 2000);
    } else if (this.currentPayment > this.targetAmount) {
      soundManager.playWrong();
      const kembalian = this.currentPayment - this.targetAmount;
      fb.className = 'feedback-box show feedback-error';
      fb.innerHTML = `💡 Uangmu berlebih Rp ${kembalian.toLocaleString('id-ID')}. Karena kita belajar membayar dengan uang pas, yuk sesuaikan lagi!`;
    } else {
      soundManager.playWrong();
      const kurang = this.targetAmount - this.currentPayment;
      fb.className = 'feedback-box show feedback-error';
      fb.innerHTML = `💡 Uangmu masih kurang Rp ${kurang.toLocaleString('id-ID')}. Silakan tambahkan uang lagi ya!`;
    }
  },

  endGame() {
    soundManager.playVictory();
    let stars = 1;
    if (this.score >= 500) stars = 3;
    else if (this.score >= 300) stars = 2;

    App.saveGameResult('warung-rupiah', this.score, stars);

    App.showResultModal({
      title: "🏪 Juragan Warung Cilik!",
      score: this.score,
      stars: stars,
      desc: `Hebat! Kamu sudah pandai menghitung nilai uang Rupiah dan berbelanja dengan teliti!`,
      replayAction: () => this.start()
    });
  }
};
