// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// Initialize the Express app
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Serve the client files
app.use(express.static(path.join(__dirname, "../client")));

// Simple route for health check
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

// Endpoint to handle chat messages
app.post("/chat", (req, res) => {
  const userMessage = req.body.message;
  
  // For now, we’ll just echo the message back
  const botResponse = `You said: ${userMessage}`;
  
  // Send the bot's response back to the client
  res.json({ reply: botResponse });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
