const dotenv = require("dotenv");
dotenv.config();
const express = require("express");

const { GoogleGenAI } = require("@google/genai");
const analyzeRoute = express.Router();

analyzeRoute.post("/", async (req, res) => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const { sentence } = req.body;
  if (!sentence) return res.status(400).json({ error: "Sentence is required" });
  try {
    const response =  await ai.models.generateContent(
      {
        model: "gemini-2.5-flash",
        contents: sentence,
        config: {
          systemInstruction:
            "You are a helpful assistant that rephrases sentences.Only return the rephrased sentences without any additional comments or context",
          maxOutputTokens: 150,
          candidateCount: 1,
          temperature: 0.7,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
        },
      }
    );
    const rephrasedSentences = response.candidates.map((candidate) =>
      candidate.content.parts.map((part) => part.text).join(" ")
    );
    res.status(200).json({result: rephrasedSentences || []});
  } catch (err) {
    console.error("🔥 Error details:", err);
    if (err.response) {
      console.error("Response data:", err.response.data);
      console.error("Response status:", err.response.status);
      console.error("Response headers:", err.response.headers);
    } else {
      console.error("Error message:", err.message);
    }
    res.status(500).json({ error: err.message });
  }
});

module.exports = analyzeRoute;
