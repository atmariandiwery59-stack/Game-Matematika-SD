/**
 * Game 6: Duel Cerdas (Mode Versus 2 Pemain 1 Layar)
 * Bertanding cepat matematika bersama teman atau orang tua
 */

const VersusGame = {
  p1Score: 0,
  p2Score: 0,
  targetScore: 5,
  p1Question: null,
  p2Question: null,
  isFinished: false,

  start() {
    this.p1Score = 0;
    this.p2Score = 0;
    this.isFinished = false;

    const gameContainer = document.getElementById('game-screen');
    gameContainer.innerHTML = `
      <div class="game-hud">
        <div class="hud-item">
          <button class="icon-btn" onclick="App.showScreen('home-screen')" title="Kembali ke Menu">🏠</button>
          <span style="font-weight:900; font-size:1.1rem; color:#4338ca;">⚔️ Duel Cerdas Matematika</span>
        </div>
        <div class="hud-item">
          <span class="hud-badge" style="background:#fef3c7; color:#b45309; font-weight:800;">Target: 5 Poin Juara!</span>
        </div>
      </div>

      <div class="versus-container">
        <!-- Panel Pemain 1 (Merah) -->
        <div class="player-panel player-1-theme">
          <div class="player-header">
            <div class="player-name" style="color:#dc2626;">🔴 Pemain 1</div>
            <div class="player-score-badge player-1-score">Skor: <span id="p1-score-val">0</span></div>
          </div>
          
          <div class="question-container" style="padding:16px; margin-bottom:12px; box-shadow:none; border:2px solid #fee2e2;">
            <div class="question-text" id="p1-question-text" style="font-size:1.7rem; margin:8px 0;">0 + 0 = ?</div>
          </div>

          <div class="choices-grid" id="p1-choices-grid" style="grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:0;"></div>
        </div>

        <!-- Panel Pemain 2 (Biru) -->
        <div class="player-panel player-2-theme">
          <div class="player-header">
            <div class="player-name" style="color:#2563eb;">🔵 Pemain 2</div>
            <div class="player-score-badge player-2-score">Skor: <span id="p2-score-val">0</span></div>
          </div>
          
          <div class="question-container" style="padding:16px; margin-bottom:12px; box-shadow:none; border:2px solid #dbeafe;">
            <div class="question-text" id="p2-question-text" style="font-size:1.7rem; margin:8px 0;">0 + 0 = ?</div>
          </div>

          <div class="choices-grid" id="p2-choices-grid" style="grid-template-columns: 1fr 1fr; gap:10px; margin-bottom:0;"></div>
        </div>
      </div>
    `;

    App.showScreen('game-screen');
    this.nextP1Question();
    this.nextP2Question();
  },

  nextP1Question() {
    if (this.isFinished) return;
    this.p1Question = QuizEngine.generateArithmetic('fase-b');
    document.getElementById('p1-question-text').textContent = this.p1Question.questionText;

    const grid = document.getElementById('p1-choices-grid');
    grid.innerHTML = '';
    this.p1Question.choices.forEach(val => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.style.fontSize = '1.3rem';
      btn.style.padding = '12px';
      btn.textContent = val;
      btn.onclick = () => this.handleP1Answer(val, btn);
      grid.appendChild(btn);
    });
  },

  nextP2Question() {
    if (this.isFinished) return;
    this.p2Question = QuizEngine.generateArithmetic('fase-b');
    document.getElementById('p2-question-text').textContent = this.p2Question.questionText;

    const grid = document.getElementById('p2-choices-grid');
    grid.innerHTML = '';
    this.p2Question.choices.forEach(val => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.style.fontSize = '1.3rem';
      btn.style.padding = '12px';
      btn.textContent = val;
      btn.onclick = () => this.handleP2Answer(val, btn);
      grid.appendChild(btn);
    });
  },

  handleP1Answer(selected, btn) {
    if (this.isFinished) return;
    if (selected === this.p1Question.answer) {
      soundManager.playCorrect();
      btn.classList.add('correct');
      this.p1Score++;
      document.getElementById('p1-score-val').textContent = this.p1Score;

      if (this.p1Score >= this.targetScore) {
        this.endVersus("Pemain 1 (Merah)");
        return;
      }
      setTimeout(() => this.nextP1Question(), 400);
    } else {
      soundManager.playWrong();
      btn.classList.add('wrong');
      setTimeout(() => btn.classList.remove('wrong'), 400);
    }
  },

  handleP2Answer(selected, btn) {
    if (this.isFinished) return;
    if (selected === this.p2Question.answer) {
      soundManager.playCorrect();
      btn.classList.add('correct');
      this.p2Score++;
      document.getElementById('p2-score-val').textContent = this.p2Score;

      if (this.p2Score >= this.targetScore) {
        this.endVersus("Pemain 2 (Biru)");
        return;
      }
      setTimeout(() => this.nextP2Question(), 400);
    } else {
      soundManager.playWrong();
      btn.classList.add('wrong');
      setTimeout(() => btn.classList.remove('wrong'), 400);
    }
  },

  endVersus(winnerName) {
    this.isFinished = true;
    soundManager.playVictory();

    App.showResultModal({
      title: `🏆 Selamat ${winnerName}!`,
      score: Math.max(this.p1Score, this.p2Score) * 100,
      stars: 3,
      desc: `${winnerName} memenangkan duel cerdas matematika dengan skor gemilang! Pertandingan yang sangat seru!`,
      replayAction: () => this.start()
    });
  }
};
