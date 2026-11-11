# Catatan Pengembangan (untuk dilanjutkan di sesi/AI/orang lain)

## Tujuan
Draft aplikasi literasi matematika. Fokus UI saat ini: tema Persona 3 Reload.
Kebutuhan fitur belum ditentukan — pemilik akan menentukan kemudian.

## Keputusan desain
- Hanya pakai API inti React Native (Animated, Pressable, View, Text). Tidak ada library gradient/animasi tambahan.
- Animasi memakai `useNativeDriver: true` (hanya transform & opacity). Warna tidak dianimasikan.
- Lobby meniru menu pause P3R: panel putih kiri + teks vertikal, menu miring bertumpuk
  (item terpilih = pita merah, teks hitam; lainnya makin biru/redup), kartu portrait kanan atas,
  petunjuk tombol kanan bawah, latar bawah laut (`AnimatedBackground variant="sea"`).
- Karakter: siluet placeholder sampai `CHARACTER_IMAGE` di `src/config.js` diisi.
  Aset resmi berhak cipta Atlus/Sega -> jangan commit ke repo publik (sudah di .gitignore).

## Cara menambah menu / layar
1. Tambah item di `MENU` pada `src/config.js` (`screen: 'NAMA'`, hapus `locked`).
2. Buat `src/screens/Nama.js` (bungkus dengan `PageShell`).
3. Daftarkan di `App.js` (`{screen === 'NAMA' && <Nama onBack={home} />}`).

## Status
- [x] Lobby bertema P3R + animasi
- [x] Materi (tabel visualisasi) & Latihan (1 soal interaktif)
- [ ] Progres, Pengaturan (placeholder "SEGERA")
- [ ] Bank soal lebih banyak, skor, penyimpanan progres
- [ ] Ganti kartu portrait kanan atas dengan data nyata

## Catatan teknis
- macOS: `EMFILE` -> `ulimit -n 10240` / watchman. Node 18/20 disarankan.
- Belum diuji visual di browser oleh pembuat awal; cek tata letak di berbagai ukuran layar.
