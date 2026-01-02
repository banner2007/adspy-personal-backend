const axios = require("axios");

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

async function analyzeTextWithGemini(text) {
  const prompt = `
Analiza este anuncio publicitario y responde en JSON con:
- hook
- emocion
- tipo_cta
- publico_objetivo
- por_que_funciona

Texto del anuncio:
"""
${text}
"""
`;

  const response = await axios.post(
    `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    }
  );

  return response.data.candidates[0].content.parts[0].text;
}

module.exports = { analyzeTextWithGemini };
