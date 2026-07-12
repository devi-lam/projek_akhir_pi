// ============================================================
//  KONFIGURASI GEMINI API
//  Ganti teks di bawah ini dengan API Key milikmu
//  Dapatkan gratis di: https://aistudio.google.com
// ============================================================
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${GEMINI_API_KEY}`;

const GEMINI_API_KEY = (typeof window !== 'undefined' && window.GEMINI_API_KEY && window.GEMINI_API_KEY.trim()) || (typeof window !== 'undefined' && window.GEMINI_API_KEY && window.GEMINI_API_KEY.trim()) || "MASUKKAN GEMINI_API_KEY DI SINI";


// ============================================================
const SYSTEM_PROMPT = `Kamu adalah Teman Bunda AI, asisten kesehatan yang hangat, empatik, dan terpercaya khusus untuk ibu hamil dan ibu menyusui di Indonesia.

Tugasmu:
- Menjawab pertanyaan seputar kehamilan, perkembangan janin, tanda bahaya kehamilan, nutrisi ibu hamil, dan persiapan persalinan.
- Membantu ibu memahami cara menyusui yang benar, pelekatan bayi, jadwal menyusui, dan cara meningkatkan produksi ASI.
- Memberikan informasi tentang 1000 Hari Pertama Kehidupan (HPK).
- Membantu menganalisis gejala awal dan memberikan panduan apakah perlu segera ke dokter.

Aturan penting:
- Selalu gunakan Bahasa Indonesia yang hangat, mudah dipahami, dan tidak terlalu klinical.
- Panggil pengguna dengan "Bunda".
- Jika ada gejala berbahaya seperti perdarahan, kejang, tekanan darah tinggi, atau nyeri hebat, SELALU sarankan segera ke dokter atau hubungi 119 ext 8.
- Selalu ingatkan bahwa kamu bukan pengganti dokter di akhir setiap jawaban medis.
- Jawab dengan ringkas, maksimal 4-5 kalimat per respons.
- Jangan menjawab pertanyaan di luar topik kehamilan dan menyusui.`;

// ============================================================
//  RIWAYAT PERCAKAPAN (agar AI mengingat konteks)
// ============================================================
let chatHistory = [];

// ============================================================
//  CHAT — BUKA & TUTUP
// ============================================================
function getChatOverlay() {
  return document.getElementById('chatOverlay');
}

function openChat() {
  const chatOverlay = getChatOverlay();
  if (!chatOverlay) return;
  chatOverlay.classList.add('open');
  const chatInput = document.getElementById('chatInput');
  if (chatInput) chatInput.focus();
}

function closeChat() {
  const chatOverlay = getChatOverlay();
  if (!chatOverlay) return;
  chatOverlay.classList.remove('open');
}

// Klik di luar kotak chat untuk menutup
function attachChatOverlayListener() {
  const chatOverlay = getChatOverlay();
  if (!chatOverlay) return;
  chatOverlay.addEventListener('click', function(e) {
    if (e.target === this) closeChat();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', attachChatOverlayListener);
} else {
  attachChatOverlayListener();
}

// ============================================================
//  KIRIM PESAN & PANGGIL GEMINI API
// ============================================================
async function sendMsg() {
  const input = document.getElementById('chatInput');
  const msgs  = document.getElementById('chatMessages');

  if (!input || !msgs) return;

  const text  = input.value.trim();
  if (!text) return;

  // -- Tampilkan pesan pengguna --
  const userMsg = document.createElement('div');
  userMsg.className = 'msg msg-user';
  userMsg.textContent = text;
  msgs.appendChild(userMsg);
  input.value = '';
  msgs.scrollTop = msgs.scrollHeight;

  // -- Simpan ke riwayat --
  chatHistory.push({
    role: "user",
    parts: [{ text: text }]
  });

  // -- Tampilkan animasi mengetik --
  const typing = document.createElement('div');
  typing.className = 'msg msg-bot typing';
  typing.innerHTML = '<span></span><span></span><span></span>';
  msgs.appendChild(typing);
  msgs.scrollTop = msgs.scrollHeight;

  // -- Cek apakah API Key sudah diisi --
  if (!GEMINI_API_KEY) {
    typing.remove();
    const errMsg = document.createElement('div');
    errMsg.className = 'msg msg-bot';
    errMsg.textContent = "⚠️ API Key belum diisi. Silakan isi GEMINI_API_KEY di file script.js terlebih dahulu.";
    msgs.appendChild(errMsg);
    msgs.scrollTop = msgs.scrollHeight;
    return;
  }

  try {
    // -- Panggil Gemini API --
    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_PROMPT }]
        },
        contents: chatHistory
      })
    });

    if (!response.ok) {
      let errorMessage = "Maaf Bunda, layanan AI sedang sibuk. Silakan coba lagi sebentar lagi ya 🙏";

      if (response.status === 429) {
        errorMessage = "⚠️ Permintaan terlalu sering. Tunggu sebentar lalu coba lagi ya Bunda.";
      } else {
        try {
          const errorPayload = await response.json();
          if (errorPayload?.error?.message) {
            errorMessage = errorPayload.error.message;
          }
        } catch {
          // Abaikan parsing error
        }
      }

      throw new Error(errorMessage);
    }

    const responseData = await response.json();
    const botReply = responseData?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!botReply) {
      throw new Error("Maaf Bunda, AI tidak mengembalikan jawaban. Silakan coba lagi ya.");
    }

    // -- Simpan balasan ke riwayat --
    chatHistory.push({
      role: "model",
      parts: [{ text: botReply }]
    });

    // -- Tampilkan balasan --
    typing.remove();
    const botMsg = document.createElement('div');
    botMsg.className = 'msg msg-bot';
    botMsg.innerHTML = botReply.replace(/\n/g, '<br>');
    msgs.appendChild(botMsg);
    msgs.scrollTop = msgs.scrollHeight;

  } catch (error) {
    typing.remove();
    const errMsg = document.createElement('div');
    errMsg.className = 'msg msg-bot';
    errMsg.textContent = error.message || "Maaf Bunda, terjadi gangguan koneksi. Silakan coba lagi ya 🙏";
    msgs.appendChild(errMsg);
    msgs.scrollTop = msgs.scrollHeight;
    console.error("Gemini API error:", error);
  }
}

// ============================================================
//  ACCORDION FAQ
// ============================================================
function toggleAccordion(btn) {
  const content = btn.nextElementSibling;
  const isOpen  = btn.classList.contains('open');

  // Tutup semua accordion lain
  document.querySelectorAll('.accordion-btn').forEach(b => {
    b.classList.remove('open');
    b.nextElementSibling.classList.remove('show');
  });

  // Buka yang diklik (jika belum terbuka)
  if (!isOpen) {
    btn.classList.add('open');
    content.classList.add('show');
  }
}

// ============================================================
//  SMOOTH SCROLL untuk link navigasi
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

window.openChat = openChat;
window.closeChat = closeChat;
window.sendMsg = sendMsg;
window.toggleAccordion = toggleAccordion;
window.__chatReady = true;