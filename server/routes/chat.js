const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { HumanMessage } = require("@langchain/core/messages");
require("dotenv").config();

const model = new ChatGoogleGenerativeAI({
  modelName: "gemini-1.5-flash",
  apiKey: process.env.GOOGLE_API_KEY,
});

// Load system prompt from file
const systemPromptPath = path.join(__dirname, "../config/SystemPrompt.md");
const systemPrompt = fs.readFileSync(systemPromptPath, "utf-8");

router.post("/", async (req, res) => {
  const userMessage = req.body.message;

  try {
    // Include the system prompt as the initial message
    const messages = [
      { role: "system", content: systemPrompt },
      new HumanMessage(userMessage)
    ];

    const response = await model.invoke(messages);
    const botReply = response.content;

    res.json({ reply: botReply });
  } catch (error) {
    console.error("Error invoking Gemini model:", error);
    res.status(500).json({ reply: "An error occurred while contacting the chatbot" });
  }
});

module.exports = router;
