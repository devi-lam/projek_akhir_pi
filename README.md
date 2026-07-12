# 🌸 Teman Bunda

**Temen Bunda** adalah platform kesehatan berbasis kecerdasan buatan (AI) yang dirancang untuk mendampingi ibu hamil dan ibu menyusui. Website ini menyediakan layanan edukasi, pemantauan, dan konsultasi berbasis AI untuk membantu ibu memperoleh informasi kesehatan yang akurat, mudah dipahami, dan personal.

## ✨ Fitur Utama

- **Chatbot AI** - Konsultasi interaktif dengan Gemini API
- **Pemeriksa Gejala Berbasis AI** - Analisis gejala kesehatan
- **Penilaian Risiko Berbasis AI** - Evaluasi risiko kehamilan
- **Pelacak Kehamilan** - Monitoring perkembangan janin
- **Pengingat Cerdas** - Notifikasi jadwal penting
- **Pelacak Menyusui** - Tracking jadwal dan durasi menyusui
- **Analisis Menyusui Berbasis AI** - Rekomendasi personal
- **Frequently Asked Questions (FAQ)** - Informasi cepat

---

## 🛠️ Teknologi yang Digunakan

### Frontend
- HTML5
- CSS3
- JavaScript 

### Backend & API
- Node.js
- Express.js
- Gemini API (Google AI)

### Deployment
- Netlify
- Netlify Functions (Serverless)

---

## 📂 Struktur Proyek

```text
projek_akhir_pi/
│
├── assets/                 # Aset (gambar, ikon, logo, dll.)
├── netlify/                # Konfigurasi Netlify Functions
├── node_modules/           # Dependencies Node.js
│
├── .env                    # Environment Variables
├── .gitignore              # Git Ignore Configuration
├── index.html              # Halaman Utama
├── style.css               # Styling Aplikasi
├── script.js               # JavaScript Frontend
├── server.js               # Backend Server (Express.js)
├── netlify.toml            # Konfigurasi Deployment Netlify
├── package.json            # Informasi Proyek & Dependencies
├── package-lock.json       # Lock File Dependencies
├── push.log                # Log Deployment
└── README.md               # Dokumentasi Proyek
```
---

## 🚀 Cara Menjalankan Proyek

### Prasyarat
- Node.js (versi 18.14.0 atau lebih tinggi)
- npm (Node Package Manager)
- Gemini API Key dari Google AI Studio

1. Clone Repository
git clone https://github.com/devi-lam/projek_akhir_pi.git
2. Masuk ke Folder Proyek
cd NAMA_REPOSITORY
3. Install Dependencies
npm install
4. Konfigurasi Environment Variables
Buat file .env di root folder dan tambahkan:
  - GEMINI_API_KEY=your_api_key_here
  - PORT=3000
5. Jalankan Development Server
  - Opsi A: Menggunakan Node.js langsung
    node server.js
  - Opsi B: Menggunakan Netlify Dev 
6. Buka di Browser
Akses aplikasi di http://localhost:3000 atau http://localhost:8888
