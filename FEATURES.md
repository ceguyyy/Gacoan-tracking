# Dokumentasi Fitur Gacoan Tracking

Dokumen ini berisi rincian seluruh fitur utama yang ada pada aplikasi **Gacoan Tracking**, termasuk mekanisme validasi, integrasi data, dan manajemen tugas.

## 1. Autentikasi & Integrasi Profil Talenta
- **Login Sederhana**: Pengguna dapat masuk ke sistem dengan mencocokkan kredensial.
- **Sinkronisasi Data Talenta Otomatis**: Saat proses *login* berhasil, aplikasi secara otomatis berjalan di latar belakang (asynchronous) untuk menarik data dari API Talenta berdasarkan alamat email. Informasi profil tambahan akan langsung terintegrasi tanpa mengharuskan pengguna mengisi ulang data.
- **Pencegahan Konflik Identitas**: Sistem mencegah `id` inti Mekari tertimpa oleh `id` bawaan sistem Talenta. Hal ini memastikan proses penyaringan tugas (*task filtering*) tetap berjalan dengan sempurna tanpa ada tugas yang hilang.

## 2. Dashboard & Manajemen Daftar Tugas
- **Tampilan Eksklusif Pengguna**: Daftar tugas disaring secara akurat sehingga pengguna hanya akan melihat *task* yang memang ditugaskan (*assigned*) ke mereka.
- **Filter Berdasarkan Status**: Terdapat *tab* navigasi yang intuitif untuk menyortir tugas berdasarkan status: `Semua`, `In Progress`, `Mendatang`, `Selesai`, dan `Terlambat`.
- **Filter Tanggal & Tombol "Hari Ini"**: Fitur pencarian tingkat lanjut menggunakan *Date Picker* yang terintegrasi dengan filter `due_date`. Terdapat juga tombol pintasan **Hari Ini** agar pengguna bisa memprioritaskan jadwal harian secara instan.

## 3. Eksekusi Tugas & Validasi Lapangan
- **Keamanan Lapis Ganda (Lokasi & Wajah)**:
  - **Check-in (Validasi Awal)**: Sistem menuntut pengguna untuk memvalidasi koordinat lokasi (GPS) dan memverifikasi identitas via foto (*face capture*) sebelum daftar tugas terbuka.
  - **Check-out (Validasi Akhir)**: Proses keamanan yang sama diulang pada tahap penyelesaian (*submission*).
- **Checklist Interaktif Modern**:
  - Kolom centang dirombak menjadi *dropdown button* dinamis (*Met* & *Not Met*).
  - Antarmuka dipercantik dengan perubahan warna latar (*Hijau/Merah*) menyesuaikan status pilihan pengguna.
  - Tombol Submit dikunci dan sistem akan mendeteksi progres (*progress bar*) hingga seluruh item selesai diklasifikasikan.
- **Kolom Catatan Dinamis (Notes)**: Kotak masukan catatan muncul seketika di bawah item tugas setelah status dikonfirmasi. Dirancang minim distraksi (tanpa *outline* default) untuk memberi fokus saat pengguna mengetik deskripsi khusus atau alasan jika kondisi *Not Met*.
- **Bukti Visual Langsung**: Modul unggah foto terpasang di samping nama tiap item *checklist*, mempermudah pelaporan instan dari lapangan.

## 4. Pelaporan dan Pengiriman (*Data Submission*)
Aplikasi mengkompilasi seluruh aktivitas menjadi satu buah muatan pelaporan terstruktur yang mencakup:
- Informasi identitas dan lokasi perusahaan.
- Waktu presisi saat mulai (*start_time*) dan selesai (*end_time*).
- Status akhir, Catatan lapangan (*Notes*), dan *Link* lampiran foto per item tugas.
- Informasi Geotag aktual.
Semua dikirim dengan *feedback loading state* dan konfirmasi akhir (*Success Screen*).

## 5. Skalabilitas & Konfigurasi
- **Manajemen Basis URL Pusat**: Pemisahan URL dasar (API) ke dalam *Environment Variables* (`VITE_API_BASE`). Memungkinkan perpindahan jalur dari lingkungan *Development*, *Staging*, hingga *Production* hanya dengan modifikasi satu baris saja.
