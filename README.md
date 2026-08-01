# 🚀 Gemini Flash API

[![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v5.2-blue?logo=express)](https://expressjs.com/)
[![Google Gemini API](https://img.shields.io/badge/Google%20Gemini-v3.5--flash-orange?logo=google)](https://aistudio.google.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

**Gemini Flash API** adalah REST API berbasis Express.js dan Node.js yang memfasilitasi integrasi serbaguna ke **Google Gemini AI** (`gemini-3.5-flash`). API ini memungkinkan pengolahan berbagai format input—baik teks biasa, gambar, dokumen, maupun audio—secara responsif dan efisien.

---

## 🎓 Konteks Proyek

Proyek ini dibangun sebagai bagian dari tugas **Sesi 2: "Eksplorasi Gemini AI API"** pada program **Maju Bareng AI** yang diselenggarakan oleh **Hacktiv8**, serta didukung penuh oleh **Google.org** dan **Asian Development Bank (ADB)**.

---

## ✨ Fitur Utama

- 📝 **Teks ke Teks**: Menghasilkan respon jawaban, ide, atau jawaban analitis dari prompt teks.
- 🖼️ **Analisis Gambar**: Memproses & mendeskripsikan konten visual (.png, .jpg, .jpeg, .gif, .webp).
- 📄 **Ringkasan Dokumen**: Ekstraksi dan pembuatan ringkasan isi dokumen (.pdf, .txt).
- 🎙️ **Transkripsi Audio**: Mengubah isi rekaman suara (.mp3, .wav) menjadi transkrip teks.
- ⚡ **In-Memory Processing**: File media yang diunggah langsung diproses melalui memory buffer (RAM) tanpa disimpan ke harddisk, sehingga cepat & aman.

---

## 🛠️ Teknologi & Library

- **Node.js** (v18+) – Runtime environment (ES Module)
- **Express.js** – Server & Web Framework
- **@google/genai** – SDK resmi Google Gen AI (`gemini-3.5-flash`)
- **Multer** – Handling unggahan file multipart/form-data via Memory Storage
- **dotenv** – Manajemen kredensial & environment variables

---

## 📋 Daftar Endpoint

| Method | Endpoint | Format Input | Parameter / Body | Deskripsi |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/generate-text` | `JSON` | `prompt` (string, required) | Menghasilkan teks berdasarkan instruksi/prompt. |
| `POST` | `/generate-from-image` | `form-data` | `image` (file, required)<br>`prompt` (text, optional) | Menganalisis & menjelaskan konten gambar. |
| `POST` | `/generate-from-document` | `form-data` | `document` (file, required)<br>`prompt` (text, optional) | Meringkas dokumen PDF atau teks. |
| `POST` | `/generate-from-audio` | `form-data` | `audio` (file, required)<br>`prompt` (text, optional) | Mentranskripsi rekaman audio ke bentuk teks. |

---

## 🚀 Cara Menjalankan Aplikasi

### 1. Clone Repository & Install Dependency

```bash
git clone https://github.com/Emzyjeppp/gemini-flash-api.git
cd gemini-flash-api
npm install
```

### 2. Konfigurasi Environment Variable

Buat file `.env` di root direktori proyek, lalu isi dengan API Key dari Google AI Studio:

```env
GEMINI_API_KEY=isi_api_key_kamu_di_sini
PORT=3000
```

> 💡 **Petunjuk**: API Key bisa kamu dapatkan secara gratis di [Google AI Studio](https://aistudio.google.com/api-keys).

### 3. Jalankan Server

```bash
node index.js
```

Jika berhasil, kamu akan melihat log berikut di terminal:
```text
Server ready on http://localhost:3000
```

---

## 🧪 Contoh Penggunaan (API Request)

### 1. Generate Teks (`/generate-text`)

- **URL**: `http://localhost:3000/generate-text`
- **Header**: `Content-Type: application/json`
- **Body**:
  ```json
  {
    "prompt": "Jelaskan kenapa langit berwarna biru secara singkat dan jelas."
  }
  ```
- **cURL**:
  ```bash
  curl -X POST http://localhost:3000/generate-text \
    -H "Content-Type: application/json" \
    -d '{"prompt": "Jelaskan kenapa langit berwarna biru secara singkat dan jelas."}'
  ```

---

### 2. Analisis Gambar (`/generate-from-image`)

- **URL**: `http://localhost:3000/generate-from-image`
- **Header**: `Content-Type: multipart/form-data`
- **Form Data**:
  - `image`: *(File .png, .jpg, .jpeg, .gif, .webp)*
  - `prompt`: `Jelaskan isi gambar berikut.` *(Opsional)*
- **cURL**:
  ```bash
  curl -X POST http://localhost:3000/generate-from-image \
    -F "image=@/path/to/gambar.jpg" \
    -F "prompt=Jelaskan isi gambar berikut."
  ```

---

### 3. Ringkasan Dokumen (`/generate-from-document`)

- **URL**: `http://localhost:3000/generate-from-document`
- **Header**: `Content-Type: multipart/form-data`
- **Form Data**:
  - `document`: *(File .pdf, .txt)*
  - `prompt`: `Tolong buat ringkasan dari dokumen berikut.` *(Opsional)*
- **cURL**:
  ```bash
  curl -X POST http://localhost:3000/generate-from-document \
    -F "document=@/path/to/dokumen.pdf"
  ```

---

### 4. Transkripsi Audio (`/generate-from-audio`)

- **URL**: `http://localhost:3000/generate-from-audio`
- **Header**: `Content-Type: multipart/form-data`
- **Form Data**:
  - `audio`: *(File .mp3, .wav)*
  - `prompt`: `Tolong buatkan transkrip dari rekaman berikut.` *(Opsional)*
- **cURL**:
  ```bash
  curl -X POST http://localhost:3000/generate-from-audio \
    -F "audio=@/path/to/rekaman.mp3"
  ```

---

## 📁 Struktur Direktori

```text
gemini-flash-api/
├── .env                  # Environment Variables (Jangan di-commit!)
├── .gitignore            # Daftar file/folder yang diabaikan oleh Git
├── index.js              # Entry point utama aplikasi Express & handler Gemini AI
├── package.json          # Manifest project & dependencies
├── package-lock.json     # Lockfile dependency
└── README.md             # Dokumentasi proyek
```

---

## 📌 Catatan Penting

- **Model Versi**: Menggunakan SDK resmi `@google/genai` dengan model default `gemini-3.5-flash`.
- **Manajemen Memori**: Seluruh file yang dikirimkan diproses langsung dalam bentuk `base64` dari memory buffer `multer.single()`, tanpa mengotori ruang penyimpan sistem.
- **Environment**: Jangan pernah membagikan atau memposting file `.env` yang berisi `GEMINI_API_KEY` ke repositori publik.

---

## 🤝 Ucapan Terima Kasih & Kredit

Terima kasih sebesar-besarnya kepada:
- **Hacktiv8 Indonesia** (Program *Maju Bareng AI*)
- **Google.org**
- **Asian Development Bank (ADB)**

---

<p center="align">
  <i>Dibuat dengan ❤️ untuk eksplorasi AI yang bermanfaat.</i>
</p>
