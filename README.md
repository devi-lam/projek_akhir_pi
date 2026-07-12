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

TemanBunda/
│
├── 📁 assets/              → Aset (gambar, font, dll)
├── 📁 netlify/             → Konfigurasi Netlify Functions
├── 📁 node_modules/        → Dependencies Node.js
├── 📄 .env                 → Environment variables (API Keys)
├── 📄 .gitignore           → Git ignore configuration
├── 🌐 index.html           → Halaman utama
├── 🎨 style.css            → Styling CSS
├── ⚙️ script.js            → JavaScript frontend
├── 🖥️ server.js            → Backend server (Express)
├── ⚙️ netlify.toml         → Konfigurasi Netlify
├── 📦 package.json         → Node.js dependencies & scripts
├── 🔒 package-lock.json    → Lock file dependencies
├── 📋 push.log             → Log deployment
└── 📖 README.md            → Dokumentasi proyek

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
