import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Untuk mendapatkan __dirname pada ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Folder frontend (index.html, style.css, script.js, assets)
app.use(express.static(__dirname));

// Route halaman utama
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Cek API Key
if (!process.env.GEMINI_API_KEY) {
    console.error("❌ GEMINI_API_KEY belum diatur pada file .env");
}

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// Endpoint Chat
app.post("/api/chat", async (req, res) => {
    try {
        const { message } = req.body;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: message,
        });

        res.json({
            reply: response.text,
        });

    } catch (err) {
        console.error("Gemini Error:", err);

        res.status(500).json({
            error: "Terjadi kesalahan saat menghubungi Gemini."
        });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});