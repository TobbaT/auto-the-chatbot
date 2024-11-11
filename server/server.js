// server/server.js
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// Import chat route
const chatRoute = require("./routes/chat");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../client")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

// Use the chat route for /chat endpoint
app.use("/chat", chatRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
