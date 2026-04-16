Berikut penjelasan lengkap, runtut, dan saling terhubung dari materi yang kamu tulis tentang Wireless Mobile Computing (WMC)—khususnya bagaimana sistem operasi mobile (seperti Android) mengelola sumber daya, proses, dan komunikasi.

📡 1. Wireless Mobile Computing (WMC)

WMC adalah sistem komputasi pada perangkat mobile (HP, tablet, dll) yang:
terhubung jaringan tanpa kabel
memiliki keterbatasan resource
harus hemat daya dan efisien

👉 Karena perangkat mobile tidak seperti komputer desktop, maka OS harus pintar mengatur:
baterai 🔋
RAM 🧠
processor ⚙️

==============================================================================================================

⚙️ 2. Resource Utama pada Mobile
🔋 a. Baterai
Sumber daya paling penting
Semua proses harus hemat energi
OS akan:
membatasi app background
mematikan proses tidak penting
pakai sistem event-driven (tidak jalan terus)

👉 Contoh:
Aplikasi tidak akan terus jalan di background kalau tidak perlu.

🧠 b. RAM
Tempat penyimpanan sementara aplikasi
Terbatas → harus di-manage ketat

👉 Jika RAM penuh:

sistem akan menjalankan killer process (Low Memory Killer)
⚙️ c. Processor (CPU)
Digunakan untuk menjalankan proses
OS akan:
mengatur prioritas proses
mengurangi penggunaan CPU untuk app background

==============================================================================================================

☠️ 3. Killer Process (Manajemen Proses)

Ini adalah mekanisme sistem untuk menentukan:
👉 proses mana yang “dibunuh” duluan saat resource (RAM) penuh

Urutan prioritas (dari paling penting → paling tidak):

1. Foreground Process (Paling Penting)
Aplikasi yang sedang digunakan user
Ada interaksi langsung

👉 Contoh:

Lagi buka WhatsApp
Lagi main game

✔ Tidak boleh dimatikan kecuali darurat

2. Background Process
Tidak terlihat, tapi masih aktif

👉 Contoh:

Musik berjalan
GPS tracking
Download file

✔ Bisa dimatikan kalau RAM butuh, tapi tidak prioritas pertama

3. Cache Process (Paling Rendah)
Aplikasi yang sudah tidak aktif
Hanya disimpan untuk mempercepat buka ulang

👉 Contoh:

App yang sudah ditutup tapi masih di recent apps

✔ Paling cepat dibunuh

==============================================================================================================

🔄 4. Komunikasi Antar Proses (IPC)

IPC = Inter Process Communication

👉 Digunakan agar aplikasi bisa saling berinteraksi
🔹 Intent (di Android)
Intent = pesan untuk menjalankan aksi tertentu

1. Explicit Intent
Tujuan jelas (app tertentu)
👉 Contoh:
Buka halaman login di aplikasi sendiri

2. Implicit Intent
Tidak spesifik → sistem pilih app yang cocok
👉 Contoh:
Klik link → pilih Chrome / browser lain
Share foto → pilih WhatsApp / Telegram

==============================================================================================================

⏱️ 5. Work Manager

Digunakan untuk menjalankan tugas:
di background
terjadwal
tetap berjalan walaupun app ditutup

👉 Contoh:
Backup WhatsApp otomatis
Sinkronisasi data ke server
Kirim log saat ada internet

✔ Kelebihan:
Hemat baterai
Bisa diatur kondisi (misal: hanya saat WiFi)

==============================================================================================================

🔐 6. Keamanan Data (FBE)

FBE = File-Based Encryption

👉 Sistem enkripsi data di Android
Cara kerja:
Setiap file dienkripsi secara terpisah
Data hanya bisa dibuka jika user unlock perangkat

👉 Keunggulan:
Lebih aman
Sebagian sistem tetap bisa jalan tanpa membuka semua data

==============================================================================================================

⚡ 7. Event-Driven (Optimasi Baterai)

Konsep:
👉 Sistem tidak berjalan terus-menerus, tapi menunggu event

Contoh:

❌ Cara lama:
App cek pesan setiap 5 detik → boros baterai

✔ Cara event-driven:
Server kirim notifikasi → app baru aktif

👉 Hasil:
Hemat baterai
CPU tidak kerja terus
Lebih efisien
🔁 Hubungan Semua Konsep (Intinya)

Semua poin di atas saling terhubung:
Baterai terbatas → perlu optimasi
RAM kecil → pakai killer process
CPU terbatas → pakai prioritas proses
Komunikasi antar app → pakai IPC (Intent)
Tugas background → pakai Work Manager
Keamanan → pakai FBE
Efisiensi → pakai event-driven

==============================================================================================================

🧠 Kesimpulan Singkat

Wireless Mobile Computing itu bukan cuma “wireless”, tapi:
👉 bagaimana sistem mobile mengatur resource terbatas secara cerdas

Dengan:
prioritas proses (foreground → cache)
komunikasi antar aplikasi (IPC)
tugas terjadwal (WorkManager)
keamanan (FBE)
efisiensi (event-driven)
