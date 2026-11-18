/**
 * Petualangan Matematika Ceria SD/MI
 * Dynamic Math Quiz Generator Engine
 * Menghasilkan soal tak terbatas secara otomatis sesuai tingkatan kelas SD/MI
 */

const QuizEngine = {
  // Utility: Random Integer antara min dan max (inklusif)
  randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  // Acak array
  shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  },

  // Buat pilihan ganda yang cerdas dan masuk akal
  generateChoices(correctAnswer, count = 4, range = 5) {
    const choices = new Set([correctAnswer]);
    let attempts = 0;
    while (choices.size < count && attempts < 50) {
      attempts++;
      const offset = this.randInt(1, range) * (Math.random() > 0.5 ? 1 : -1);
      const val = correctAnswer + offset;
      if (val >= 0 && val !== correctAnswer) {
        choices.add(val);
      }
    }
    // Jika masih kurang, tambahkan acak
    let fallback = correctAnswer + 1;
    while (choices.size < count) {
      if (!choices.has(fallback)) choices.add(fallback);
      fallback++;
    }
    return this.shuffle(Array.from(choices));
  },

  // Generator Soal Hitung Kilat (Penjumlahan, Pengurangan, Perkalian, Pembagian)
  generateArithmetic(fase = 'fase-a') {
    const icons = ['🍎', '⭐', '🍬', '🚗', '🐱', '⚽', '🧁', '🎈'];
    const chosenIcon = icons[this.randInt(0, icons.length - 1)];

    if (fase === 'fase-a') {
      // Kelas 1 - 2 SD/MI
      const isAddition = Math.random() > 0.45;
      if (isAddition) {
        const a = this.randInt(1, 10);
        const b = this.randInt(1, 10);
        const ans = a + b;
        return {
          topic: "Penjumlahan Bergambar",
          prompt: `Berapa jumlah seluruh ${chosenIcon}?`,
          questionText: `${a} + ${b} = ?`,
          visualType: "concrete",
          visualA: Array(a).fill(chosenIcon),
          visualB: Array(b).fill(chosenIcon),
          operator: "+",
          answer: ans,
          choices: this.generateChoices(ans, 4, 3),
          explanation: `Ada ${a} buah ditambah ${b} buah. Jika dihitung bersama: ${a} + ${b} = ${ans}!`
        };
      } else {
        const b = this.randInt(1, 8);
        const a = b + this.randInt(1, 10); // Menjamin hasil selalu positif
        const ans = a - b;
        return {
          topic: "Pengurangan Asik",
          prompt: `Ada ${a} ${chosenIcon}, diambil ${b}. Sisanya berapa ya?`,
          questionText: `${a} - ${b} = ?`,
          visualType: "concrete",
          visualA: Array(a).fill(chosenIcon),
          visualB: Array(b).fill("❌"),
          operator: "-",
          answer: ans,
          choices: this.generateChoices(ans, 4, 3),
          explanation: `Dari ${a} buah diambil ${b} buah, tersisa ${ans} buah!`
        };
      }
    } else if (fase === 'fase-b') {
      // Kelas 3 - 4 SD/MI
      const opType = this.randInt(1, 4);
      if (opType === 1) {
        // Penjumlahan ratusan
        const a = this.randInt(20, 150);
        const b = this.randInt(15, 120);
        const ans = a + b;
        return {
          topic: "Penjumlahan Ratusan",
          prompt: "Hitung hasil penjumlahan berikut:",
          questionText: `${a} + ${b} = ?`,
          answer: ans,
          choices: this.generateChoices(ans, 4, 10),
          explanation: `${a} + ${b} = ${ans}`
        };
      } else if (opType === 2) {
        // Pengurangan puluhan/ratusan
        const b = this.randInt(15, 90);
        const a = b + this.randInt(20, 150);
        const ans = a - b;
        return {
          topic: "Pengurangan Bersusun",
          prompt: "Berapakah hasil dari pengurangan berikut?",
          questionText: `${a} - ${b} = ?`,
          answer: ans,
          choices: this.generateChoices(ans, 4, 10),
          explanation: `${a} - ${b} = ${ans}`
        };
      } else if (opType === 3) {
        // Perkalian tabel 1-10
        const a = this.randInt(2, 9);
        const b = this.randInt(2, 9);
        const ans = a * b;
        return {
          topic: "Perkalian Juara",
          prompt: `${a} kelompok masing-masing berisi ${b} benda:`,
          questionText: `${a} × ${b} = ?`,
          answer: ans,
          choices: this.generateChoices(ans, 4, 6),
          explanation: `${a} dikali ${b} adalah ${ans} (artinya ${b} dijumlahkan sebanyak ${a} kali).`
        };
      } else {
        // Pembagian habis
        const divisor = this.randInt(2, 9);
        const ans = this.randInt(2, 9);
        const dividend = divisor * ans;
        return {
          topic: "Pembagian Cepat",
          prompt: `${dividend} permen dibagi rata kepada ${divisor} anak:`,
          questionText: `${dividend} ÷ ${divisor} = ?`,
          answer: ans,
          choices: this.generateChoices(ans, 4, 3),
          explanation: `${dividend} dibagi ${divisor} = ${ans}`
        };
      }
    } else {
      // Fase C: Kelas 5 - 6 SD/MI
      const type = this.randInt(1, 4);
      if (type === 1) {
        // Perkalian puluhan
        const a = this.randInt(12, 35);
        const b = this.randInt(11, 25);
        const ans = a * b;
        return {
          topic: "Perkalian Puluhan",
          prompt: "Hitung hasil perkalian berikut:",
          questionText: `${a} × ${b} = ?`,
          answer: ans,
          choices: this.generateChoices(ans, 4, 20),
          explanation: `${a} × ${b} = ${ans}`
        };
      } else if (type === 2) {
        // Operasi hitung campuran (Kabataku)
        const a = this.randInt(5, 15);
        const b = this.randInt(2, 6);
        const c = this.randInt(2, 8);
        const ans = a + (b * c);
        return {
          topic: "Operasi Campuran (Kabataku)",
          prompt: "Ingat: Dahulukan perkalian sebelum penjumlahan!",
          questionText: `${a} + ${b} × ${c} = ?`,
          answer: ans,
          choices: this.generateChoices(ans, 4, 10),
          explanation: `Hitung perkalian dulu: ${b} × ${c} = ${b * c}, lalu jumlahkan: ${a} + ${b * c} = ${ans}!`
        };
      } else if (type === 3) {
        // KPK Sederhana
        const pairs = [
          { a: 3, b: 4, kpk: 12 },
          { a: 4, b: 6, kpk: 12 },
          { a: 6, b: 8, kpk: 24 },
          { a: 5, b: 6, kpk: 30 },
          { a: 4, b: 5, kpk: 20 },
          { a: 6, b: 9, kpk: 18 }
        ];
        const p = pairs[this.randInt(0, pairs.length - 1)];
        return {
          topic: "KPK (Kelipatan Terkecil)",
          prompt: `Berapakah KPK dari ${p.a} dan ${p.b}?`,
          questionText: `KPK(${p.a}, ${p.b}) = ?`,
          answer: p.kpk,
          choices: this.generateChoices(p.kpk, 4, 8),
          explanation: `Kelipatan bersama terkecil dari ${p.a} dan ${p.b} adalah ${p.kpk}!`
        };
      } else {
        // FPB Sederhana
        const pairs = [
          { a: 12, b: 16, fpb: 4 },
          { a: 15, b: 20, fpb: 5 },
          { a: 18, b: 24, fpb: 6 },
          { a: 20, b: 30, fpb: 10 },
          { a: 14, b: 21, fpb: 7 },
          { a: 24, b: 36, fpb: 12 }
        ];
        const p = pairs[this.randInt(0, pairs.length - 1)];
        return {
          topic: "FPB (Faktor Terbesar)",
          prompt: `Berapakah FPB dari ${p.a} dan ${p.b}?`,
          questionText: `FPB(${p.a}, ${p.b}) = ?`,
          answer: p.fpb,
          choices: this.generateChoices(p.fpb, 4, 4),
          explanation: `Faktor pembagi persekutuan terbesar dari ${p.a} dan ${p.b} adalah ${p.fpb}!`
        };
      }
    }
  }
};
