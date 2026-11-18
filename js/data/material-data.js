/**
 * Petualangan Matematika Ceria SD/MI
 * Ensiklopedia & Rangkuman Materi Matematika Lengkap (Kurikulum Merdeka & K13)
 */

const STUDY_MATERIALS = [
  {
    id: "fase-a-hitung",
    fase: "fase-a",
    grade: "Kelas 1 - 2 SD/MI",
    icon: "🍎",
    title: "Penjumlahan & Pengurangan Asik",
    summary: "Belajar menggabungkan dan mengurangi benda nyata serta angka 1 sampai 100.",
    content: `
      <h4>1. Apa itu Penjumlahan? (+)</h4>
      <p>Penjumlahan adalah menggabungkan dua kelompok benda menjadi satu kelompok yang lebih banyak.</p>
      <div class="material-tip">
        <strong>Contoh Nyata:</strong><br>
        Kamu punya 3 apel 🍎🍎🍎, lalu Ibu memberi 2 apel lagi 🍎🍎.<br>
        Sekarang apelmu ada: <strong>3 + 2 = 5 apel</strong>!
      </div>

      <h4>2. Apa itu Pengurangan? (-)</h4>
      <p>Pengurangan adalah mengambil sebagian benda dari kelompok sehingga jumlahnya menjadi lebih sedikit.</p>
      <div class="material-tip">
        <strong>Contoh Nyata:</strong><br>
        Ada 6 burung di pohon 🐦🐦🐦🐦🐦🐦. Terbang 2 ekor 🐦🐦.<br>
        Sisa burung di pohon: <strong>6 - 2 = 4 burung</strong>!
      </div>

      <h4>3. Trik Berhitung Pasangan 10 (Sahabat 10)</h4>
      <p>Ingat pasangan angka yang jika dijumlahkan hasilnya 10:</p>
      <ul>
        <li>1 berteman dengan 9 (1 + 9 = 10)</li>
        <li>2 berteman dengan 8 (2 + 8 = 10)</li>
        <li>3 berteman dengan 7 (3 + 7 = 10)</li>
        <li>4 berteman dengan 6 (4 + 6 = 10)</li>
        <li>5 berteman dengan 5 (5 + 5 = 10)</li>
      </ul>
    `
  },
  {
    id: "fase-b-perkalian",
    fase: "fase-b",
    grade: "Kelas 3 - 4 SD/MI",
    icon: "✖️",
    title: "Rahasia Perkalian & Pembagian",
    summary: "Memahami perkalian sebagai penjumlahan berulang dan pembagian sebagai pengurangan berulang.",
    content: `
      <h4>1. Perkalian adalah Penjumlahan Berulang (×)</h4>
      <p>Jika kamu melihat <strong>4 × 3</strong>, artinya ada 4 kelompok yang masing-masing berisi 3 benda.</p>
      <div class="material-tip">
        4 × 3 = 3 + 3 + 3 + 3 = <strong>12</strong>
      </div>

      <h4>2. Sifat Pertukaran (Komutatif)</h4>
      <p>Urutan perkalian boleh dibolak-balik, hasilnya tetap sama!</p>
      <p>Contoh: 5 × 2 = 10 dan 2 × 5 = 10.</p>

      <h4>3. Pembagian adalah Pengurangan Berulang (÷)</h4>
      <p>Jika kamu punya 12 kue dan dibagikan sama rata ke 3 teman, kurangi 3 terus sampai kuenya habis (0):</p>
      <div class="material-tip">
        12 - 3 - 3 - 3 - 3 = 0 (dikurangi 3 sebanyak 4 kali)<br>
        Maka: <strong>12 ÷ 3 = 4</strong>. Masing-masing teman dapat 4 kue!
      </div>
    `
  },
  {
    id: "fase-b-pecahan",
    fase: "fase-b",
    grade: "Kelas 3 - 4 SD/MI",
    icon: "🍕",
    title: "Dunia Pecahan (Kue & Pizza)",
    summary: "Mengenal pembilang, penyebut, pecahan senilai, dan cara membagi bagian utuh.",
    content: `
      <h4>1. Mengenal Bagian Pecahan</h4>
      <p>Pecahan ditulis sebagai: <strong>a / b</strong></p>
      <ul>
        <li><strong>a (Atas / Pembilang):</strong> Berapa bagian yang diambil atau dimakan.</li>
        <li><strong>b (Bawah / Penyebut):</strong> Jumlah seluruh potongan yang sama besar.</li>
      </ul>

      <h4>2. Contoh Pizza Lezat:</h4>
      <div class="material-tip">
        🍕 Satu pizza utuh dipotong menjadi <strong>4 bagian</strong> sama besar.<br>
        Jika kamu memakan <strong>1 potong</strong>, kamu telah memakan <strong>1/4 (seperempat)</strong> bagian pizza!<br>
        Sisa pizza di piring adalah <strong>3/4 (tiga perempat)</strong> bagian.
      </div>

      <h4>3. Pecahan Senilai</h4>
      <p>Pecahan yang bentuk angkanya beda tetapi nilainya sama!</p>
      <p>Contoh: <strong>1/2</strong> senilai dengan <strong>2/4</strong> dan <strong>4/8</strong> (setengah pizza tetap setengah pizza meskipun dipotong lebih kecil!).</p>
    `
  },
  {
    id: "fase-b-uang",
    fase: "fase-b",
    grade: "Kelas 2 - 4 SD/MI",
    icon: "💵",
    title: "Mengenal Nilai Uang Rupiah",
    summary: "Mengenal mata uang Indonesia, nilai pecahan, dan cara menghitung uang kembalian saat belanja.",
    content: `
      <h4>1. Pecahan Uang Kertas Indonesia</h4>
      <ul>
        <li><strong>Rp 1.000</strong> (Warna Cokelat/Abu)</li>
        <li><strong>Rp 2.000</strong> (Warna Abu-abu Terang)</li>
        <li><strong>Rp 5.000</strong> (Warna Kuning/Cokelat Keemasan)</li>
        <li><strong>Rp 10.000</strong> (Warna Ungu)</li>
        <li><strong>Rp 20.000</strong> (Warna Hijau)</li>
        <li><strong>Rp 50.000</strong> (Warna Biru)</li>
        <li><strong>Rp 100.000</strong> (Warna Merah)</li>
      </ul>

      <h4>2. Cara Menghitung Kembalian Belanja</h4>
      <div class="material-tip">
        <strong>Rumus Kembalian:</strong><br>
        <strong>Uang Kembalian = Uang yang Dibayarkan - Total Harga Belanja</strong><br><br>
        <em>Contoh:</em> Kamu beli buku tulis seharga <strong>Rp 3.500</strong>. Kamu membayar dengan uang <strong>Rp 5.000</strong>.<br>
        Kembalian = Rp 5.000 - Rp 3.500 = <strong>Rp 1.500</strong>!
      </div>
    `
  },
  {
    id: "fase-ab-geometri",
    fase: "fase-a",
    grade: "Kelas 1 - 5 SD/MI",
    icon: "📐",
    title: "Bangun Datar & Bangun Ruang",
    summary: "Mengenal sifat-sifat bangun, jumlah sisi, sudut, serta rumus luas dan keliling.",
    content: `
      <h4>1. Macam Bangun Datar & Ciri-cirinya:</h4>
      <ul>
        <li><strong>Persegi (Bujur Sangkar):</strong> Punya 4 sisi sama panjang dan 4 sudut siku-siku (90°).<br>
        <em>Keliling = 4 × sisi</em> | <em>Luas = sisi × sisi</em></li>
        <li><strong>Persegi Panjang:</strong> Punya 2 pasang sisi sejajar (panjang & lebar) dan 4 sudut siku-siku.<br>
        <em>Keliling = 2 × (p + l)</em> | <em>Luas = panjang × lebar</em></li>
        <li><strong>Segitiga:</strong> Punya 3 sisi dan 3 sudut.<br>
        <em>Luas = (alas × tinggi) ÷ 2</em></li>
        <li><strong>Lingkaran:</strong> Garis lengkung yang berjarak sama ke titik pusat, punya jari-jari (r) dan diameter (d).</li>
      </ul>

      <h4>2. Bangun Ruang Sederhana:</h4>
      <ul>
        <li><strong>Kubus:</strong> Memiliki 6 sisi berbentuk persegi yang sama persis, 12 rusuk, dan 8 titik sudut. <em>Volume = s × s × s</em></li>
        <li><strong>Balok:</strong> Memiliki 6 sisi, 12 rusuk, dan 8 titik sudut. <em>Volume = p × l × t</em></li>
      </ul>
    `
  },
  {
    id: "fase-c-fpb-kpk",
    fase: "fase-c",
    grade: "Kelas 5 - 6 SD/MI",
    icon: "🧠",
    title: "Master FPB & KPK",
    summary: "Trik mudah mencari Faktor Persekutuan Terbesar dan Kelipatan Persekutuan Terkecil.",
    content: `
      <h4>1. FPB (Faktor Persekutuan Terbesar)</h4>
      <p>Bilangan terbesar yang bisa membagi habis kedua bilangan tersebut.</p>
      <div class="material-tip">
        <strong>Faktor dari 12:</strong> 1, 2, 3, 4, 6, 12<br>
        <strong>Faktor dari 18:</strong> 1, 2, 3, 6, 9, 18<br>
        Faktor persekutuan (yang sama): 1, 2, 3, 6<br>
        Yang terbesar adalah <strong>6</strong>, jadi <strong>FPB(12, 18) = 6</strong>!
      </div>

      <h4>2. KPK (Kelipatan Persekutuan Terkecil)</h4>
      <p>Bilangan terkecil yang merupakan kelipatan dari kedua bilangan tersebut.</p>
      <div class="material-tip">
        <strong>Kelipatan 4:</strong> 4, 8, 12, 16, 20, 24...<br>
        <strong>Kelipatan 6:</strong> 6, 12, 18, 24, 30...<br>
        Kelipatan bersama yang paling kecil adalah <strong>12</strong>.<br>
        Jadi <strong>KPK(4, 6) = 12</strong>!
      </div>
    `
  }
];
