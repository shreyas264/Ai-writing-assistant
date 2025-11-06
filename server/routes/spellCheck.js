const dotenv = require("dotenv");
dotenv.config();
const express =require('express')
const { GoogleGenAI } = require("@google/genai");
const spellCheckRoute = express.Router()

spellCheckRoute.post("/", async(req, res)=>{
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
      const { text } = req.body;
      if (!text) return res.status(400).json({ error: "text is required" });
      try {
        const response = await ai.models.generateContent(
          {
            model: "gemini-2.5-flash",
            contents: text,
            config: {
              systemInstruction:
                "You are a helpful assistant that checks and corrects spelling error in the following text. Only return the corrected text without any additional comments or context.",
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
        const correctedText =
          response.candidates?.[0]?.content?.parts?.map((p) => p.text).join(" ") ||
          "No response";
    
        res.status(200).json({result : correctedText || []});
        
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
})

module.exports = spellCheckRoute