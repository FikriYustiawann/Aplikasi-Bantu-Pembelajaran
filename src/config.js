// ============================================================
//  KONFIGURASI DRAFT  — ubah di sini, tanpa menyentuh komponen
// ============================================================

// --- Karakter -------------------------------------------------
// Letakkan gambar karakter (PNG transparan) di assets/characters/makoto.png
// lalu GANTI baris di bawah menjadi:
//   export const CHARACTER_IMAGE = require('../assets/characters/makoto.png');
// Selama masih null, aplikasi menampilkan siluet placeholder.
export const CHARACTER_IMAGE = null;
export const CHARACTER_NAME = 'MAKOTO YUKI';
export const CHARACTER_ROLE = 'Pemandu Matematika';

// --- Judul ----------------------------------------------------
export const APP_TITLE = ['MATH', 'LITERACY'];
export const APP_SUBTITLE = 'Senilai & Berbalik Nilai';
export const TICKER_TEXT = 'MATH LITERACY  ◆  SENILAI & BERBALIK NILAI  ◆  DARK HOUR';

// --- Menu lobby -----------------------------------------------
// screen: nama layar tujuan (lihat App.js). locked: true = "SEGERA".
export const MENU = [
  { key: 'materi',  label: 'MATERI',     sub: 'Tabel visualisasi', screen: 'MATERI' },
  { key: 'latihan', label: 'LATIHAN',    sub: 'Simulasi kasus',    screen: 'LATIHAN' },
  { key: 'progres', label: 'PROGRES',    sub: 'Rapor belajar',     screen: null, locked: true },
  { key: 'setting', label: 'PENGATURAN', sub: 'Suara & tampilan',  screen: null, locked: true },
];
