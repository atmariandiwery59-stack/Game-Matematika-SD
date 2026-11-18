/**
 * Game 5: Petualang Waktu & Jam Ajaib
 * Belajar membaca jam analog dan menghitung durasi waktu
 */

const JamWaktuGame = {
  score: 0,
  currentRound: 0,
  maxRounds: 5,
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
          <span class="hud-badge hud-timer">⏰ Jam: <span id="clock-round">1</span>/5</span>
        </div>
      </div>

      <div class="question-container">
        <div class="question-badge-topic">Petualang Waktu</div>
        <p class="question-prompt" id="clock-prompt">Perhatikan jam analog berikut:</p>
        
        <div class="clock-display-wrap" id="clock-svg-wrap"></div>
        <div class="question-text" id="clock-question">Pukul berapakah ini?</div>
      </div>

      <div class="feedback-box" id="feedback-box"></div>

      <div class="choices-grid" id="clock-choices"></div>
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
    document.getElementById('clock-round').textContent = this.currentRound;

    const timeQuestions = [
      {
        hours: 7,
        minutes: 0,
        prompt: "Bel masuk sekolah berbunyi tepat waktu di pagi hari.",
        question: "Jam di atas menunjukkan pukul...",
        answer: "Pukul 07.00",
        choices: ["Pukul 07.00", "Pukul 12.07", "Pukul 08.00", "Pukul 06.00"],
        explanation: "Jarum pendek menunjuk angka 7 dan jarum panjang menunjuk angka 12, maka dibaca pukul 07.00!"
      },
      {
        hours: 9,
        minutes: 30,
        prompt: "Waktu istirahat pertama di sekolah untuk jajan dan bermain bersama teman.",
        question: "Jam di atas menunjukkan pukul...",
        answer: "Pukul 09.30",
        choices: ["Pukul 09.30", "Pukul 06.45", "Pukul 10.30", "Pukul 09.06"],
        explanation: "Jarum pendek di antara angka 9 dan 10, dan jarum panjang di angka 6 (30 menit). Dibaca pukul 09.30 (setengah sepuluh)!"
      },
      {
        hours: 12,
        minutes: 0,
        prompt: "Terdengar kumandang adzan Dzuhur di siang hari yang cerah.",
        question: "Jam di atas menunjukkan pukul...",
        answer: "Pukul 12.00",
        choices: ["Pukul 12.00", "Pukul 01.00", "Pukul 11.00", "Pukul 06.30"],
        explanation: "Kedua jarum tepat menunjuk ke angka 12, artinya pukul 12.00 tepat siang!"
      },
      {
        hours: 3,
        minutes: 15,
        prompt: "Sore hari waktu Ahmad pergi mengaji ke madrasah.",
        question: "Jam di atas menunjukkan pukul...",
        answer: "Pukul 03.15",
        choices: ["Pukul 03.15", "Pukul 03.03", "Pukul 04.15", "Pukul 02.15"],
        explanation: "Jarum pendek di angka 3 dan jarum panjang di angka 3 (15 menit). Dibaca pukul 03.15 atau jam 3 lewat seperempat!"
      },
      {
        hours: 8,
        minutes: 0,
        prompt: "Fatimah mulai belajar jam 08.00 dan selesai jam 10.00 malam.",
        question: "Berapa jam Fatimah belajar malam itu?",
        answer: "2 Jam",
        choices: ["2 Jam", "1 Jam", "3 Jam", "4 Jam"],
        explanation: "Dari pukul 08.00 sampai pukul 10.00: 10 - 8 = 2 jam!"
      }
    ];

    const q = timeQuestions[this.currentRound - 1] || timeQuestions[0];
    this.currentQuestion = q;

    document.getElementById('clock-prompt').textContent = q.prompt;
    document.getElementById('clock-question').textContent = q.question;

    this.renderClock(q.hours, q.minutes);

    const choicesBox = document.getElementById('clock-choices');
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

  renderClock(hours, minutes) {
    const wrap = document.getElementById('clock-svg-wrap');
    const center = 100;
    const r = 85;

    // Hitung sudut jarum jam (derajat)
    const minuteAngle = minutes * 6; // 360 / 60 = 6 deg/min
    const hourAngle = (hours % 12) * 30 + (minutes / 60) * 30; // 360 / 12 = 30 deg/hour

    // Buat angka 1 - 12 pada dial
    let numbersSvg = '';
    for (let i = 1; i <= 12; i++) {
      const angle = (i * 30 - 90) * (Math.PI / 180);
      const nx = center + (r - 20) * Math.cos(angle);
      const ny = center + (r - 20) * Math.sin(angle) + 5; // sedikit offset vertikal teks
      numbersSvg += `<text x="${nx}" y="${ny}" text-anchor="middle" font-size="14" font-weight="900" fill="#334155">${i}</text>`;
    }

    wrap.innerHTML = `
      <svg class="clock-face-svg" viewBox="0 0 200 200">
        <!-- Bingkai Jam Luar -->
        <circle cx="${center}" cy="${center}" r="${r + 8}" fill="#3b82f6" stroke="#1d4ed8" stroke-width="4" />
        <circle cx="${center}" cy="${center}" r="${r}" fill="#ffffff" />
        
        <!-- Angka Jam 1 - 12 -->
        ${numbersSvg}

        <!-- Jarum Jam Pendek (Hour) -->
        <line x1="${center}" y1="${center}" x2="${center}" y2="${center - 45}" stroke="#ef4444" stroke-width="6" stroke-linecap="round"
              transform="rotate(${hourAngle} ${center} ${center})" />

        <!-- Jarum Jam Panjang (Minute) -->
        <line x1="${center}" y1="${center}" x2="${center}" y2="${center - 68}" stroke="#1e293b" stroke-width="4" stroke-linecap="round"
              transform="rotate(${minuteAngle} ${center} ${center})" />

        <!-- Titik Pusat Jam -->
        <circle cx="${center}" cy="${center}" r="6" fill="#f59e0b" stroke="#b45309" stroke-width="2" />
      </svg>
    `;
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
      fb.innerHTML = `🎉 <strong>Tepat Sekali!</strong> Waktu yang kamu tebak benar! (+100 poin) <br><small>${q.explanation}</small>`;

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

    App.saveGameResult('jam-waktu', this.score, stars);

    App.showResultModal({
      title: "⏰ Pahlawan Waktu Hebat!",
      score: this.score,
      stars: stars,
      desc: `Kamu sudah sangat mahir membaca jam dan menghitung waktu kegiatan sehari-hari!`,
      replayAction: () => this.start()
    });
  }
};
