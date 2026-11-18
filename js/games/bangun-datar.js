/**
 * Game 4: Detektif Bangun Datar & Geometri
 * Mengenal bentuk, sisi, sudut, keliling, dan luas bangun datar
 */

const BangunDatarGame = {
  score: 0,
  currentRound: 0,
  maxRounds: 6,
  currentQuestion: null,

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
          <span class="hud-badge hud-timer">📐 Misi: <span id="geom-round">1</span>/6</span>
        </div>
      </div>

      <div class="question-container">
        <div class="question-badge-topic">Detektif Geometri</div>
        <p class="question-prompt" id="geom-prompt">Perhatikan bangun di bawah ini:</p>
        
        <div class="shape-display-wrap" id="shape-container"></div>
        <div class="question-text" id="geom-question">Bangun apakah ini?</div>
      </div>

      <div class="feedback-box" id="feedback-box"></div>

      <div class="choices-grid" id="geom-choices"></div>
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
    document.getElementById('geom-round').textContent = this.currentRound;

    const questionsPool = [
      {
        type: 'persegi',
        svg: `<rect x="35" y="35" width="130" height="130" rx="4" fill="#60a5fa" stroke="#1d4ed8" stroke-width="4" />`,
        prompt: "Bangun datar ini memiliki 4 sisi yang sama panjang dan 4 sudut siku-siku.",
        question: "Nama bangun datar ini adalah...",
        answer: "Persegi",
        choices: ["Persegi", "Persegi Panjang", "Segitiga", "Trapesium"],
        explanation: "Persegi memiliki 4 sisi yang semuanya sama panjang dan 4 sudut siku-siku (90°)."
      },
      {
        type: 'lingkaran',
        svg: `<circle cx="100" cy="100" r="65" fill="#f472b6" stroke="#be185d" stroke-width="4" />`,
        prompt: "Bangun datar ini hanya memiliki 1 sisi lengkung dan tidak memiliki titik sudut.",
        question: "Bangun apakah ini?",
        answer: "Lingkaran",
        choices: ["Lingkaran", "Segitiga", "Oval", "Jajar Genjang"],
        explanation: "Lingkaran terbentuk dari garis lengkung yang berjarak sama ke titik pusat."
      },
      {
        type: 'segitiga',
        svg: `<polygon points="100,25 35,165 165,165" fill="#34d399" stroke="#047857" stroke-width="4" />`,
        prompt: "Berapa banyak sisi yang dimiliki oleh bangun segitiga ini?",
        question: "Jumlah sisi segitiga adalah...",
        answer: "3 sisi",
        choices: ["3 sisi", "4 sisi", "5 sisi", "2 sisi"],
        explanation: "Segitiga memiliki 3 buah sisi dan 3 titik sudut."
      },
      {
        type: 'persegi_panjang',
        svg: `<rect x="20" y="50" width="160" height="90" rx="4" fill="#fbbf24" stroke="#b45309" stroke-width="4" />`,
        prompt: "Bangun ini memiliki 2 pasang sisi sejajar dan 4 sudut siku-siku.",
        question: "Nama bangun datar ini adalah...",
        answer: "Persegi Panjang",
        choices: ["Persegi Panjang", "Persegi", "Belah Ketupat", "Layang-layang"],
        explanation: "Persegi panjang memiliki sisi panjang dan lebar yang berpasangan sejajar."
      },
      {
        type: 'hitung_keliling_persegi',
        svg: `
          <rect x="40" y="40" width="120" height="120" fill="#a78bfa" stroke="#6d28d9" stroke-width="4" />
          <text x="100" y="30" text-anchor="middle" font-size="14" font-weight="900" fill="#4c1d95">Sisi = 5 cm</text>
        `,
        prompt: "Sebuah persegi memiliki panjang sisi 5 cm. (Rumus Keliling = 4 × sisi)",
        question: "Berapakah keliling persegi tersebut?",
        answer: "20 cm",
        choices: ["20 cm", "25 cm", "15 cm", "10 cm"],
        explanation: "Keliling persegi = 4 × sisi = 4 × 5 cm = 20 cm!"
      },
      {
        type: 'hitung_luas_persegi_panjang',
        svg: `
          <rect x="25" y="45" width="150" height="80" fill="#fb923c" stroke="#c2410c" stroke-width="4" />
          <text x="100" y="35" text-anchor="middle" font-size="14" font-weight="900" fill="#7c2d12">Panjang = 6 cm</text>
          <text x="185" y="90" text-anchor="middle" font-size="14" font-weight="900" fill="#7c2d12">L = 4 cm</text>
        `,
        prompt: "Persegi panjang dengan panjang 6 cm dan lebar 4 cm. (Rumus Luas = p × l)",
        question: "Berapakah luas persegi panjang tersebut?",
        answer: "24 cm²",
        choices: ["24 cm²", "20 cm²", "10 cm²", "28 cm²"],
        explanation: "Luas = panjang × lebar = 6 × 4 = 24 cm²!"
      }
    ];

    const q = questionsPool[this.currentRound - 1] || questionsPool[0];
    this.currentQuestion = q;

    document.getElementById('geom-prompt').textContent = q.prompt;
    document.getElementById('geom-question').textContent = q.question;

    const shapeBox = document.getElementById('shape-container');
    shapeBox.innerHTML = `
      <svg class="shape-svg" viewBox="0 0 200 200">
        ${q.svg}
      </svg>
    `;

    const choicesBox = document.getElementById('geom-choices');
    choicesBox.innerHTML = '';

    const shuffled = QuizEngine.shuffle(q.choices);
    shuffled.forEach((choice, idx) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.innerHTML = `<span style="opacity:0.6;font-size:0.9rem;margin-right:6px;">${['A', 'B', 'C', 'D'][idx]}.</span> ${choice}`;
      btn.onclick = () => this.checkAnswer(choice, btn);
      choicesBox.appendChild(btn);
    });

    const fb = document.getElementById('feedback-box');
    fb.className = 'feedback-box';
    fb.style.display = 'none';
  },

  checkAnswer(choice, btn) {
    const q = this.currentQuestion;
    const isCorrect = (choice === q.answer);

    const allBtns = document.querySelectorAll('.choice-btn');
    allBtns.forEach(b => b.disabled = true);

    const fb = document.getElementById('feedback-box');

    if (isCorrect) {
      soundManager.playCorrect();
      btn.classList.add('correct');
      this.score += 100;
      document.getElementById('game-score').textContent = this.score;

      fb.className = 'feedback-box show feedback-success';
      fb.innerHTML = `🎉 <strong>Tepat Sekali!</strong> (+100 poin) <br><small>${q.explanation}</small>`;

      setTimeout(() => {
        this.nextRound();
      }, 2000);
    } else {
      soundManager.playWrong();
      btn.classList.add('wrong');

      allBtns.forEach(b => {
        if (b.textContent.includes(q.answer)) {
          b.classList.add('correct');
        }
      });

      fb.className = 'feedback-box show feedback-error';
      fb.innerHTML = `💡 <strong>Penjelasan:</strong> ${q.explanation}`;

      setTimeout(() => {
        this.nextRound();
      }, 2500);
    }
  },

  endGame() {
    soundManager.playVictory();
    let stars = 1;
    if (this.score >= 500) stars = 3;
    else if (this.score >= 300) stars = 2;

    App.saveGameResult('bangun-datar', this.score, stars);

    App.showResultModal({
      title: "📐 Detektif Bangun Datar Hebat!",
      score: this.score,
      stars: stars,
      desc: `Kamu telah berhasil memecahkan teka-teki bangun datar dan menghitung keliling & luas dengan teliti!`,
      replayAction: () => this.start()
    });
  }
};
