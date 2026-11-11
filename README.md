# Math Literacy P3R

Aplikasi belajar matematika (Perbandingan Senilai & Berbalik Nilai) dengan UI bertema
Persona 3 Reload. Dibangun dengan Expo (React Native + Web).

## Menjalankan
```bash
npm install
npx expo start --web      # buka http://localhost:19006
```
Jika muncul `EMFILE: too many open files` di macOS: `ulimit -n 10240` atau `brew install watchman`.
Disarankan Node 18/20 (Expo SDK 49).

## Struktur
```
App.js                      navigasi antar layar (state sederhana)
src/config.js               teks, menu, karakter  <- ubah di sini dulu
src/theme.js                palet warna
src/screens/                Lobby, Materi, Latihan
src/components/             AnimatedBackground, Character, LobbyMenu, PageShell, Hud, Ticker
src/hooks/useLoop.js        helper animasi berulang
assets/characters/          taruh gambar karakter sendiri (tidak di-commit)
```
Lihat `PROJECT_NOTES.md` untuk catatan pengembangan.
