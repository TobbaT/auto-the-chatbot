// server/routes/chat.js
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const { ChatGoogleGenerativeAI } = require("@langchain/google-genai");
const { HumanMessage, AIMessage } = require("@langchain/core/messages");
require("dotenv").config();

const model = new ChatGoogleGenerativeAI({
  modelName: "gemini-1.5-flash",
  apiKey: process.env.GOOGLE_API_KEY,
});

const systemPromptPath = path.join(__dirname, "../config/SystemPrompt.md");
const systemPrompt = fs.readFileSync(systemPromptPath, "utf-8");

// In-memory history array
let history = [{ role: "system", content: systemPrompt }];

// Add new message to history
const addToHistory = (role, content) => {
  history.push({ role, content });
};

// Handle Auto's response commands (simple example)
const parseResponseCommands = (text) => {
  const commands = [];
  const regex = /(?:edit|delete) message (\d+):?\s*(.*)/gi;
  let match;

  while ((match = regex.exec(text)) !== null) {
    const [ , index, newText ] = match;
    commands.push({ action: match[0].startsWith("delete") ? "delete" : "edit", index: parseInt(index), newText });
  }
  return commands;
};

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
    const response = await model.invoke(messages);
    const botReply = response.content;

    // Interpret response commands if any
    // const commands = parseResponseCommands(botReply);
    // for (const command of commands) {
    //   if (command.action === "delete") history.splice(command.index, 1);
    //   if (command.action === "edit") history[command.index].content = command.newText;
    // }

    // Add bot's reply to history
    addToHistory("assistant", botReply);

    res.json({ history });
  } catch (error) {
    console.error("Error invoking Gemini model:", error);
    res.status(500).json({ reply: "An error occurred while contacting the chatbot" });
  }
});

module.exports = router;
