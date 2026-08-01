# Gemini Flash API

REST API berbasis Express.js dan Node.js yang menghubungkan klien ke Google Gemini AI untuk memproses teks, gambar, dokumen, dan audio. Proyek ini dibuat untuk tugas Sesi 2: "Eksplorasi Gemini AI API" pada program Maju Bareng AI oleh Hacktiv8, didukung oleh Google.org dan Asian Development Bank.

## Fitur

- Generasi teks dari prompt pengguna (`/generate-text`)
- Analisis dan deskripsi gambar (`/generate-from-image`)
- Pembuatan ringkasan dokumen PDF dan TXT (`/generate-from-document`)
- Transkripsi file audio MP3 dan WAV (`/generate-from-audio`)
- Pengolahan file di memori tanpa menyimpan file ke disk.

## Teknologi

- Node.js (v18+)
- Express.js
- @google/genai (model gemini-3.5-flash)
- Multer (memory storage)
- dotenv

## API Endpoints

| Method | Path | Input | Deskripsi |
|---|---|---|---|
| POST | /generate-text | JSON `{ "prompt": "..." }` | Generate teks dari prompt |
| POST | /generate-from-image | form-data: `image` (File), `prompt` (Teks, opsional) | Analisis gambar |
| POST | /generate-from-document | form-data: `document` (File), `prompt` (Teks, opsional) | Ringkasan dokumen PDF atau TXT |
| POST | /generate-from-audio | form-data: `audio` (File), `prompt` (Teks, opsional) | Transkripsi audio MP3 atau WAV |

## Cara Menjalankan

1. Clone repositori dan pasang dependensi:

```bash
git clone https://github.com/Emzyjeppp/gemini-flash-api.git
cd gemini-flash-api
npm install
```

2. Buat file `.env` di direktori root:

```env
GEMINI_API_KEY=isi_api_key_dari_google_ai_studio
PORT=3000
```

Dapatkan API key melalui Google AI Studio (https://aistudio.google.com/api-keys).

3. Jalankan server:

```bash
node index.js
```

Server berjalan di `http://localhost:3000`.

## Contoh Request

### 1. Generate Teks

POST `http://localhost:3000/generate-text`
Header: `Content-Type: application/json`

```json
{
  "prompt": "Jelaskan kenapa langit berwarna biru"
}
```

cURL:

```bash
curl -X POST http://localhost:3000/generate-text \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Jelaskan kenapa langit berwarna biru"}'
```

### 2. Analisis Gambar

POST `http://localhost:3000/generate-from-image`
Header: `Content-Type: multipart/form-data`

Field form-data:
- `image`: file (.png, .jpg, .jpeg, .gif, .webp)
- `prompt`: `Jelaskan isi gambar berikut` (opsional)

cURL:

```bash
curl -X POST http://localhost:3000/generate-from-image \
  -F "image=@/path/to/image.png" \
  -F "prompt=Jelaskan isi gambar berikut"
```

### 3. Ringkasan Dokumen

POST `http://localhost:3000/generate-from-document`
Header: `Content-Type: multipart/form-data`

Field form-data:
- `document`: file (.pdf, .txt)
- `prompt`: `Tolong buat ringkasan dari dokumen berikut` (opsional)

cURL:

```bash
curl -X POST http://localhost:3000/generate-from-document \
  -F "document=@/path/to/doc.pdf"
```

### 4. Transkripsi Audio

POST `http://localhost:3000/generate-from-audio`
Header: `Content-Type: multipart/form-data`

Field form-data:
- `audio`: file (.mp3, .wav)
- `prompt`: `Tolong buatkan transkrip dari rekaman berikut` (opsional)

cURL:

```bash
curl -X POST http://localhost:3000/generate-from-audio \
  -F "audio=@/path/to/audio.mp3"
```

## Struktur File

```text
gemini-flash-api/
  .env
  .gitignore
  index.js
  package.json
  package-lock.json
  README.md
```

## Catatan

- Dapatkan API key dari Google AI Studio (https://aistudio.google.com/api-keys).
- Model yang digunakan adalah gemini-3.5-flash.
- Multer memproses file langsung dari memory buffer. Server tidak menyimpan file ke disk.
