const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.suggestMessage = async (req, res) => {
  const { objective } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `
      Generate 3 creative, short, personalized marketing message variants for this campaign objective: "${objective}".
      Each message should include the customer's name using {name} as a placeholder.
      Example: "Hi {name}, here’s 10% off on your next order!"
      Output each message on a new line.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Split into separate messages, filter out empty lines
    const suggestions = text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    res.json({ suggestion: suggestions[0] });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
