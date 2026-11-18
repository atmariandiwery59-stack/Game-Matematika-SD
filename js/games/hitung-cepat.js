/**
 * Game 1: Hitung Kilat & Petualangan Angka
 * Menghitung Penjumlahan, Pengurangan, Perkalian, Pembagian secara interaktif
 */

const HitungCepatGame = {
  score: 0,
  lives: 3,
  combo: 0,
  currentRound: 0,
  maxRounds: 10,
  timerInterval: null,
  timeLeft: 20,
  currentQuestion: null,
  activeFase: 'fase-a',

  start(fase = 'fase-a') {
    this.activeFase = fase;
    this.score = 0;
    this.lives = 3;
    this.combo = 0;
    this.currentRound = 0;

    const gameContainer = document.getElementById('game-screen');
    gameContainer.innerHTML = `
      <div class="game-hud">
        <div class="hud-item">
          <button class="icon-btn" onclick="App.showScreen('home-screen')" title="Kembali ke Menu">🏠</button>
          <span class="hud-badge hud-score">⭐ Skor: <span id="game-score">0</span></span>
        </div>
        <div class="hud-item">
          <span class="hud-badge hud-timer">⏱️ <span id="game-timer">20</span>s</span>
          <span class="hud-badge hud-combo" id="combo-badge" style="display:none;">🔥 x1</span>
        </div>
        <div class="hud-item">
          <span class="hud-lives" id="game-lives">❤️❤️❤️</span>
        </div>
      </div>

      <div class="question-container">
        <div class="question-badge-topic" id="q-topic">Materi</div>
        <p class="question-prompt" id="q-prompt">Pertanyaan</p>
        <div class="question-visual-box" id="q-visual"></div>
        <div class="question-text" id="q-text">0 + 0 = ?</div>
      </div>

      <div class="feedback-box" id="feedback-box"></div>

      <div class="choices-grid" id="choices-container"></div>
    `;

    App.showScreen('game-screen');
    this.nextQuestion();
  },

  nextQuestion() {
    if (this.lives <= 0 || this.currentRound >= this.maxRounds) {
      this.endGame();
      return;
    }

    this.currentRound++;
    this.currentQuestion = QuizEngine.generateArithmetic(this.activeFase);
    this.renderQuestion();
    this.startTimer();
  },

  renderQuestion() {
    const q = this.currentQuestion;
    document.getElementById('q-topic').textContent = `${q.topic} (Ronde ${this.currentRound}/${this.maxRounds})`;
    document.getElementById('q-prompt').textContent = q.prompt;
    document.getElementById('q-text').textContent = q.questionText;

    const visualBox = document.getElementById('q-visual');
    visualBox.innerHTML = '';

    // Tampilkan benda konkrit jika tersedia (sangat membantu kelas 1 & 2)
    if (q.visualA && q.visualA.length > 0) {
      const wrap = document.createElement('div');
      wrap.className = 'concrete-items-wrap';

      const groupA = document.createElement('div');
      groupA.className = 'concrete-group';
      q.visualA.forEach(icon => {
        const span = document.createElement('span');
        span.className = 'concrete-item-icon';
        span.textContent = icon;
        groupA.appendChild(span);
      });
      wrap.appendChild(groupA);

      const opSign = document.createElement('span');
      opSign.style.fontSize = '2rem';
      opSign.style.fontWeight = '900';
      opSign.style.margin = '0 8px';
      opSign.textContent = q.operator;
      wrap.appendChild(opSign);

      const groupB = document.createElement('div');
      groupB.className = 'concrete-group';
      q.visualB.forEach(icon => {
        const span = document.createElement('span');
        span.className = 'concrete-item-icon';
        span.textContent = icon;
        groupB.appendChild(span);
      });
      wrap.appendChild(groupB);

      visualBox.appendChild(wrap);
    }

    // Render pilihan jawaban
    const choicesBox = document.getElementById('choices-container');
    choicesBox.innerHTML = '';

    q.choices.forEach((choice, index) => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.innerHTML = `<span style="opacity:0.6;font-size:0.9rem;margin-right:6px;">${['A', 'B', 'C', 'D'][index]}.</span> ${choice}`;
      btn.onclick = () => this.checkAnswer(choice, btn);
      choicesBox.appendChild(btn);
    });

    const feedback = document.getElementById('feedback-box');
    feedback.className = 'feedback-box';
    feedback.style.display = 'none';
  },

  startTimer() {
    clearInterval(this.timerInterval);
    this.timeLeft = 20;
    const timerEl = document.getElementById('game-timer');
    timerEl.textContent = this.timeLeft;

    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      timerEl.textContent = this.timeLeft;

      if (this.timeLeft <= 0) {
        clearInterval(this.timerInterval);
        this.timeOut();
      }
    }, 1000);
  },

  checkAnswer(selectedAnswer, clickedButton) {
    clearInterval(this.timerInterval);
    const q = this.currentQuestion;
    const isCorrect = (selectedAnswer === q.answer);

    // Disable all buttons
    const allBtns = document.querySelectorAll('.choice-btn');
    allBtns.forEach(b => b.disabled = true);

    const feedback = document.getElementById('feedback-box');

    if (isCorrect) {
      soundManager.playCorrect();
      clickedButton.classList.add('correct');
      this.combo++;
      const bonus = Math.min(this.combo, 5) * 10;
      this.score += (50 + bonus + this.timeLeft * 2);

      feedback.className = 'feedback-box show feedback-success';
      feedback.innerHTML = `🎉 <strong>Hebat Sekali!</strong> Jawabanmu benar! (+${50 + bonus} poin) <br><small>${q.explanation}</small>`;

      // Tampilkan combo
      if (this.combo > 1) {
        const comboBadge = document.getElementById('combo-badge');
        comboBadge.style.display = 'inline-flex';
        comboBadge.textContent = `🔥 Kombo x${this.combo}!`;
      }
    } else {
      soundManager.playWrong();
      clickedButton.classList.add('wrong');
      this.combo = 0;
      this.lives--;
      document.getElementById('combo-badge').style.display = 'none';

      // Sorot jawaban yang benar
      allBtns.forEach(b => {
        if (b.textContent.includes(String(q.answer))) {
          b.classList.add('correct');
        }
      });

      feedback.className = 'feedback-box show feedback-error';
      feedback.innerHTML = `💡 <strong>Yuk pelajari:</strong> ${q.explanation}`;
    }

    // Update HUD
    document.getElementById('game-score').textContent = this.score;
    this.updateLivesDisplay();

    setTimeout(() => {
      this.nextQuestion();
    }, 2200);
  },

  timeOut() {
    soundManager.playWrong();
    this.lives--;
    this.combo = 0;
    document.getElementById('combo-badge').style.display = 'none';
    this.updateLivesDisplay();

    const feedback = document.getElementById('feedback-box');
    feedback.className = 'feedback-box show feedback-error';
    feedback.innerHTML = `⏰ <strong>Waktu Habis!</strong> Jawaban yang benar adalah <strong>${this.currentQuestion.answer}</strong>.`;

    setTimeout(() => {
      this.nextQuestion();
    }, 2000);
  },

  updateLivesDisplay() {
    let hearts = '';
    for (let i = 0; i < 3; i++) {
      hearts += (i < this.lives) ? '❤️' : '🖤';
    }
    const livesEl = document.getElementById('game-lives');
    if (livesEl) livesEl.textContent = hearts;
  },

  endGame() {
    clearInterval(this.timerInterval);
    soundManager.playVictory();

    // Hitung bintang
    let stars = 1;
    if (this.score >= 500) stars = 3;
    else if (this.score >= 250) stars = 2;

    // Simpan progres
    App.saveGameResult('hitung-cepat', this.score, stars);

    // Tampilkan modal hasil
    App.showResultModal({
      title: this.lives > 0 ? "🎉 Misi Berhasil Diselesaikan!" : "Semangat! Coba Lagi Ya!",
      score: this.score,
      stars: stars,
      desc: `Kamu berhasil menyelesaikan ${this.currentRound - (this.lives <= 0 ? 1 : 0)} soal berhitung dengan skor gemilang!`,
      replayAction: () => this.start(this.activeFase)
    });
  }
};
