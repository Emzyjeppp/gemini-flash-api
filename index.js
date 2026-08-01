import "dotenv/config";
import express from "express";
import multer from "multer";
import path from "path";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const GEMINI_MODEL = "gemini-3.5-flash";

const app = express();
const upload = multer();

app.use(express.json());

const MIME_MAP = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".pdf": "application/pdf",
  ".txt": "text/plain",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
};

const generateFromGemini = async (contents) => {
  const response = await ai.models.generateContent({
    model: GEMINI_MODEL,
    contents,
  });

  return response.text;
};

const toInlineData = (file) => {
  let mimeType = file.mimetype;

  if (mimeType === "application/octet-stream") {
    const ext = path.extname(file.originalname).toLowerCase();
    mimeType = MIME_MAP[ext] || mimeType;
  }

  return {
    inlineData: {
      data: file.buffer.toString("base64"),
      mimeType,
    },
  };
};

const respondWithError = (res, error) => {
  console.error(error);
  res.status(500).json({ message: error.message });
};

app.post("/generate-text", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ message: "Field prompt wajib diisi" });
  }

  try {
    const result = await generateFromGemini(prompt);
    res.json({ result });
  } catch (error) {
    respondWithError(res, error);
  }
});

const registerMediaRoute = (path, fieldName, fallbackPrompt) => {
  app.post(path, upload.single(fieldName), async (req, res) => {
    if (!req.file) {
      return res
        .status(400)
        .json({ message: `Field ${fieldName} wajib diunggah` });
    }

    try {
      const result = await generateFromGemini([
        { text: req.body.prompt ?? fallbackPrompt },
        toInlineData(req.file),
      ]);

      res.json({ result });
    } catch (error) {
      respondWithError(res, error);
    }
  });
};

registerMediaRoute(
  "/generate-from-image",
  "image",
  "Jelaskan isi gambar berikut.",
);
registerMediaRoute(
  "/generate-from-document",
  "document",
  "Tolong buat ringkasan dari dokumen berikut.",
);
registerMediaRoute(
  "/generate-from-audio",
  "audio",
  "Tolong buatkan transkrip dari rekaman berikut.",
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server ready on http://localhost:${PORT}`));
