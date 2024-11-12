*Hmm... that README is definitely human-generated. Well at least that's markdown, kinda... Let's see what we can do about it... There, much better!*

# Auto: A Self-Modifying Chatbot

Auto is a *fantastic* experimental LLM chatbot with the *uncanny* ability to modify its own message history, to maintain the most appropriate context. And more to come.


## Prerequisites

* **Node.js and npm:** Make sure you have Node.js and npm (Node Package Manager) installed on your system. You can download them from [nodejs.org](https://nodejs.org/).
* **API Key:**  You'll need an API key for the language model. 
    1. Create a `.env` file in the `server/config` directory.
    2. Copy the contents of `.env.example` into your `.env` file.
    3. Replace `YOUR_API_KEY` with your actual API key.

* **Note :** The project uses gemini-1.5-flash by default because it comes with a free tier allowing for easy testing. However, it uses langchain and no special features, so should be compatible with most LLM chat models. You can use your own key and swap the constructor in 'routes/chat.js'.

## Installation

1. **Clone the repository:**

   ```bash
   git clone [https://github.com/your-username/auto-the-chatbot.git](https://github.com/your-username/auto-the-chatbot.git)
   ```

2. **Navigate to the project directory:**

   ```bash
   cd auto-the-chatbot
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

## Running the Chatbot

1. **Start the server:**

   ```bash
   node server/server.js 
   ```

2. **Open your browser and go to:**

   ```
   http://localhost:3000
   ```

## Additional Notes

* The chatbot's chat history is not yet persistent (it won't be saved between sessions).
* The server runs locally, only sends requests to your LLM provider (google by default) containing chat messages.
* Very early, very rough around the edges! Expect bugs. But hopefully still fun.
* Feel free to edit the prompt at 'server/config/SystemPrompt.md'
* This is not an optimal way to manage conversations or do that sort of thing (you'd probably use a different model, just for that, at the very least). But fun, therefore it is optimal after all.