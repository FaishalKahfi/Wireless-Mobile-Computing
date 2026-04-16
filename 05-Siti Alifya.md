Berikut adalah penjelasan rinci menggunakan framework yang terstruktur:

1. Prioritas dan Siklus Hidup Proses (Killer Process)
Sistem Android menggunakan mekanisme "Killer Process" untuk membebaskan memori (RAM) saat dibutuhkan. Urutan prioritasnya adalah:
- Foreground Process: Aplikasi yang sedang digunakan pengguna di layar (interaksi aktif). Ini memiliki prioritas tertinggi dan terakhir untuk dihentikan.
- Background Process: Aplikasi yang tidak terlihat oleh pengguna tetapi masih berjalan (misalnya, aplikasi yang baru saja ditinggalkan). Sistem akan menutup ini jika memori penuh.
- Cache: Proses yang sudah tidak aktif namun tetap disimpan di memori agar saat dibuka kembali, proses pemuatannya jauh lebih cepat.

2. Komunikasi Antar Proses (IPC) & Mekanisme Kerja
Agar komponen aplikasi dapat saling berbicara, Android menggunakan beberapa protokol:
- IPC (Inter-Process Communication): Mekanisme yang memungkinkan satu proses berbagi data dengan proses lain.
- Intent: Objek pembawa pesan untuk meminta tindakan dari komponen aplikasi lain.
  - Eksplisit: Menyebutkan secara spesifik aplikasi mana yang akan dibuka.
  - Implisit: Memberikan instruksi umum (misal: "Buka NFC" atau "Buka Browser"), lalu sistem mencari aplikasi yang mampu menanganinya.
- WorkManager: Digunakan untuk menjadwalkan tugas di latar belakang (background tasks) yang tetap berjalan meskipun aplikasi ditutup atau perangkat dimulai ulang.
- Keamanan Data (FBE): Catatan menyebutkan FBE (File-Based Encryption), di mana setiap file dienkripsi dengan kunci yang berbeda, meningkatkan keamanan data pengguna.

3. Optimasi Baterai dan Performa
Sistem Android sangat ketat dalam menjaga efisiensi daya. Terdapat dua kondisi utama yang dijelaskan:
* Kondisi Aktif vs Pasif
- Aktif: Saat aplikasi digunakan secara intensif, sistem memberikan sumber daya penuh.
* Pasif: Saat aplikasi tidak digunakan, sistem melakukan pembatasan akses CPU dan jaringan untuk menghemat baterai.
* Fitur Penghematan
- Doze Mode: Mengurangi konsumsi baterai dengan menunda pekerjaan latar belakang (network access & CPU-intensive tasks) saat perangkat tidak digunakan dalam waktu lama.
- App Standby: Membatasi akses jaringan bagi aplikasi yang jarang dibuka oleh pengguna.

4. Struktur Data dan File
Di sisi kiri papan tulis, terdapat referensi mengenai format file dan manajemen penyimpanan:
- Format File: Disebutkan format .pdf, .docx, dan .html. Ini menunjukkan bagaimana aplikasi menangani berbagai tipe data.
-  Skema UI: Terdapat coretan kotak-kotak yang menyerupai wireframe atau alur antarmuka aplikasi, yang menunjukkan bagaimana data ditampilkan dari proses latar belakang ke layar pengguna (User Interface).

Ringkasan Poin Penting (Takeaway):
1. Manajemen Memori :	Mengutamakan Foreground, mengorbankan Background/Cache saat RAM penuh.
2. Intent           :	Alat komunikasi utama (Eksplisit untuk target pasti, Implisit untuk fungsi umum).
3. Optimasi         : Sistem secara otomatis menyeimbangkan antara performa aplikasi dan daya tahan baterai.
4. Keamanan          : Penggunaan enkripsi berbasis file (FBE) untuk melindungi privasi data.
