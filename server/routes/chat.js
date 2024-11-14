// server/routes/chat.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { HumanMessage, AIMessage } = require("@langchain/core/messages");
const { applyCommands } = require("../utils/history");
require("dotenv").config();

// Initialize the model with the API key from environment variables
const model = new ChatGoogleGenerativeAI({
  modelName: "gemini-1.5-flash",
  apiKey: process.env.GOOGLE_API_KEY,
});

// Load the system prompt from a markdown file
const systemPromptPath = path.join(__dirname, "../config/SystemPrompt.md");
const systemPrompt = fs.readFileSync(systemPromptPath, "utf-8");

// In-memory history array to store chat history
let history = [{ role: "system", content: systemPrompt }];

// Function to add a new message to the history
const addToHistory = (role, content) => {
  history.push({ role, content });
};

// POST endpoint to handle incoming chat messages
router.post("/", async (req, res) => {
  const userMessage = req.body.message;
  addToHistory("user", userMessage);

  try {
    // Construct the message sequence including history
    const messages = history.map(({ role, content }) => {
      if (role === "system") {
        return { role, content };
      }
      return role === "user" ? new HumanMessage(content) : new AIMessage(content);
    });

    // Invoke the model
    console.log(messages)
    const response = await model.invoke(messages);
    const botReply = response.content;

    function parseChatbotResponse(response) {
      // Step 1: Strip backticks and any leading `json` marker
      const jsonString = response.trim().replace(/^```json\s*|\s*```$/g, '').trim();
    
      try {
        // Step 2: Parse the JSON string into an object
        const parsedObject = JSON.parse(jsonString);
        return parsedObject;
      } catch (error) {
        console.error("Failed to parse JSON:", error);
        console.error("Response:", jsonString);
        return null;
      }
    }
    const structuredResponse = parseChatbotResponse(botReply);
    console.log(structuredResponse);
    applyCommands(history, structuredResponse.actions);
    // Add bot's reply to history
    addToHistory("assistant", botReply);

    res.json({ history });
  } catch (error) {
    console.error("Error invoking Gemini model:", error);
    res.status(500).json({ reply: "An error occurred while contacting the chatbot" });
  }
});

module.exports = router;
