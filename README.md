# 🚀 MyJobTrend — Sistem Rekomendasi Keterampilan Prediktif

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white)

**MyJobTrend** adalah aplikasi web *full-stack* yang dirancang untuk menjembatani kesenjangan antara pencari kerja dan pasar kerja. Aplikasi ini menyediakan pencarian kerja cerdas, analisis CV, asisten chatbot AI, dan rekomendasi keterampilan berbasis *machine learning* untuk membantu pengguna tetap kompetitif dalam karier mereka.

---

## 🌟 Fitur Utama

- **💼 Platform Pencarian Kerja**: Telusuri dan cari lowongan kerja dengan filter realistis (gaji, tingkat pengalaman, jenis pekerjaan).
- **🔖 Simpan Lowongan (Saved Jobs)**: Simpan lowongan kerja yang diminati untuk dilihat kembali nanti.
- **📊 Dasbor Analisis CV**: Unggah CV Anda dan dapatkan analisis dinamis berbasis data mengenai keterampilan Anda, serta identifikasi kesenjangan berdasarkan permintaan pasar kerja nyata.
- **🤖 Prediksi Pekerjaan (ML)**: Tempelkan deskripsi pekerjaan dan model *deep learning* kami akan memprediksi serta merekomendasikan keterampilan yang perlu Anda kuasai.
- **💬 Chatbot AI**: Asisten interaktif yang membantu Anda menavigasi jalur karier dan menjawab pertanyaan seputar pekerjaan.
- **🔐 Autentikasi Pengguna & Profil**: Sistem login dan registrasi yang aman dengan autentikasi JWT, fitur lupa kata sandi (*forgot password*), serta manajemen profil yang dipersonalisasi.
- **🌙 Mode Gelap (Dark Mode)**: Dukungan tampilan mode gelap untuk kenyamanan mata saat menggunakan aplikasi.

---

## 🏗️ Arsitektur & Teknologi

Proyek ini dibangun menggunakan arsitektur modern yang terdiri dari tiga komponen utama:

1. **Frontend**: Dibangun dengan **React.js** dan **Vite** (Di-deploy ke Vercel), menawarkan antarmuka pengguna yang sangat cepat, responsif, dan interaktif.
2. **Backend**: Dibangun dengan **Node.js** dan **Express.js** (Di-deploy ke Railway), berfungsi sebagai REST API yang kuat untuk autentikasi, data pekerjaan, dan profil pengguna, didukung oleh database **PostgreSQL**.
3. **ML API**: Dibangun dengan **Python** dan **Flask** (Di-deploy ke Hugging Face Spaces), melayani model *Deep Learning* (Keras/TensorFlow) untuk pemrosesan bahasa alami (NLP) tingkat lanjut dan prediksi keterampilan.

---

## 🚀 Persiapan Lingkungan (Environment Setup)

Ikuti langkah-langkah terperinci ini untuk menyiapkan dan menjalankan proyek secara lokal di mesin Anda.

### Prasyarat

Pastikan Anda telah menginstal:
- **Node.js** (v18 atau lebih baru)
- **Python** (3.9 atau lebih baru) - *Hanya jika ingin menjalankan ML API secara lokal*
- **PostgreSQL** (berjalan secara lokal atau dari penyedia cloud seperti Supabase/Railway)
- **Git**

### 1. Kloning Repositori
```bash
git clone <url-repositori-anda>
cd capstone_final
```

### 2. Setup Database (PostgreSQL)
1. Buat database PostgreSQL dengan nama `myjobtrend` (atau nama lain sesuai pilihan Anda).
2. Buka pgAdmin atau terminal PostgreSQL (psql).
3. Jalankan skrip SQL yang berada di dalam folder `backend/` (seperti `schema.sql` atau file inisialisasi lainnya) pada database Anda untuk membuat tabel-tabel yang diperlukan (Users, Jobs, Profiles, dll).

### 3. Setup Backend (Node.js)
1. Buka terminal baru dan arahkan ke direktori backend:
   ```bash
   cd backend
   npm install
   ```
2. Buat file `.env` di dalam folder `backend/` dan atur variabel lingkungan sesuai dengan konfigurasi database Anda:
   ```env
   DB_USER=postgres
   DB_PASSWORD=password_database_anda
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=myjobtrend
   JWT_SECRET=rahasia_jwt_anda_yang_sangat_aman
   PORT=5000
   ```
3. Jalankan server backend:
   ```bash
   npm run start:dev
   ```
   *(Server akan berjalan pada `http://localhost:5000`)*

### 4. Setup API Machine Learning (Hugging Face Space)

Aplikasi ini menggunakan model Machine Learning yang telah di-deploy ke **Hugging Face Spaces**. 
- **Tautan API ML:** `https://dugong12-test.hf.space`

**Cara Menggunakannya:**
Anda tidak perlu menjalankan ML API secara lokal karena frontend sudah dikonfigurasi untuk langsung menembak API endpoint di Hugging Face Space tersebut. URL ini disetel sebagai variabel seperti `CONFIG_API_URL` pada komponen frontend. Ketika Anda memasukkan deskripsi pekerjaan di antarmuka, frontend secara otomatis mengirimkan *request* ke tautan ML tersebut dan mengembalikan rekomendasi keterampilan.

*(Opsional)* Jika Anda ingin menjalankan ML API secara lokal untuk pengembangan:
```bash
cd ml_api
python -m venv venv
# Windows:
venv\Scripts\activate
# Mac/Linux:
# source venv/bin/activate

pip install -r requirements.txt
python app.py
```
*(Lalu pastikan frontend diarahkan ke `http://localhost:5001` untuk sementara waktu)*

### 5. Setup Frontend (React & Vite)
1. Buka terminal baru di direktori utama (`capstone_final/`):
   ```bash
   npm install
   ```
2. Buat file `.env` (jika menggunakan variabel environment) di *root* direktori proyek frontend atau sesuaikan endpoint API di kode jika diarahkan ke backend produksi (Railway). Namun secara default untuk pengembangan lokal, frontend ini menembak ke `http://localhost:5000`.
3. Jalankan server frontend:
   ```bash
   npm run dev
   ```
   *(Frontend akan berjalan pada `http://localhost:5173`)*

---

## 💻 Cara Menjalankan & Menggunakan Aplikasi

Setelah Backend dan Frontend berjalan secara lokal (atau jika Anda menggunakan versi *deploy*), ikuti langkah-langkah berikut untuk menggunakan aplikasi:

1. Buka browser dan kunjungi `http://localhost:5173` (atau tautan Vercel Anda).
2. **Registrasi**: Buat akun baru pada halaman daftar.
3. **Login**: Masuk menggunakan email dan kata sandi yang baru dibuat.
4. **Pengaturan Profil**: Setelah login, isi atau lengkapi data profil Anda.
5. **Cari Pekerjaan**: Buka halaman **Job Search** untuk mencari lowongan pekerjaan yang sesuai dengan keahlian Anda. Anda dapat mencoba filter yang tersedia.
6. **Simpan Lowongan**: Anda dapat menyimpan pekerjaan yang Anda suka dengan menekan ikon simpan (bookmark), lalu Anda dapat melihat daftar simpanan tersebut di halaman **Saved Jobs**.
7. **Prediksi Keterampilan (ML)**: Pergi ke halaman fitur prediksi (misalnya di Dashboard), salin deskripsi pekerjaan yang Anda temukan di internet, lalu tempel (*paste*) ke kotak input prediksi. Model Machine Learning kami (melalui Hugging Face) akan memproses teks tersebut dan merekomendasikan *skills* apa saja yang perlu Anda pelajari untuk melamar pekerjaan tersebut!

---

## 🛠️ Penyelesaian Masalah (Troubleshooting)

- **Aplikasi Frontend menampilkan Error 404 saat di-refresh (di Vercel)**: Ini dikarenakan *client-side routing*. Pastikan Anda telah memiliki file `vercel.json` dengan konfigurasi *rewrites* ke `index.html`.
- **Gagal Login / Tidak bisa Fetch Data Pekerjaan**: Pastikan server backend Node.js Anda berjalan. Jika menguji secara lokal, periksa pengaturan CORS di server backend agar mengizinkan request dari `http://localhost:5173`.
- **Prediksi ML Gagal / Lama Memuat**: Dikarenakan ML API di-host di Hugging Face Spaces versi gratis, API mungkin tertidur (*sleep* / hibernasi) jika tidak digunakan. Tunggu beberapa saat agar sistem *Awake*, dan coba lagi.

---

## 👨‍💻 Tim Pengembang (Capstone Team)

**Tim CC26-PSU129**

*Dikembangkan dengan ❤️ oleh Tim Capstone.*
