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
   git clone https://github.com/TobbaT/auto-the-chatbot.git
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

## Project Summary: **Auto**

**Objective**:  
Auto is an evolving LLM-powered chatbot designed to assist users with flexible interaction, including the ability to modify its own responses and chat history. The chatbot is built using a combination of LangChain, Google’s Gemini model (`gemini-1.5-flash`), and a Node.js backend.

---

### 1. **Tech Stack**

- **Frontend**: HTML, CSS, and vanilla JavaScript for a lightweight, browser-based chat interface.
- **Backend**: Node.js with Express to serve static files and handle API routes.
- **LLM Integration**: LangChain and Google Gemini (`gemini-1.5-flash` model) for conversational AI.
- **Commands & Structured Responses**: Auto outputs structured JSON data, with fields for `message` and `actions`, allowing it to provide freeform replies alongside specific instructions for modifying prior chat history.

---

### 2. **Key Files & Directories**

1. **`client`**:
   - **HTML**: A simple interface with an input field and message display area.
   - **JavaScript (`client/script.js`)**: Handles user input, sends messages to the backend, and displays chat history. 
   
2. **`server`**:
   - **`server.js`**: Initializes an Express server to serve the frontend and handle `/chat` API requests.
   - **`routes/chat.js`**: Main endpoint for handling chat interactions. Sends user messages to the LLM and parses Auto's responses for commands.
   - **`config/SystemPrompt.md`**: Contains Auto’s initial system prompt. The prompt defines Auto's personality and starting instructions.
   - **`utils/history.js`**: Contains logic for action application. 

---


### 4. **Chat Flow & Structured Responses**

Auto is designed to output structured JSON responses with two primary fields:
  - **Message**: Free-form text for conversational responses.
  - **Actions**: Structured commands that modify chat history.

### 5. **Server-Side Setup**

- **Handling Chat History**: The server maintains a complete chat history in memory, appending each interaction as a new entry. Each message includes the role (`user` or `assistant`) and content.
  
- **Commands & History Modification**: Auto’s responses may include actions like `edit` or `delete`, allowing it to update or remove specific entries in the chat history. The `chat.js` route parses these commands and modifies the history accordingly.

---

### 6. **Example Response Format**

When Auto generates a response, it outputs JSON with a `message` field and an `actions` array. For example:

```json
{
  "message": "Here's some information you requested!",
  "actions": [
    { "type": "edit", "target_id": 3, "content": "Updated information for message 3" },
    { "type": "delete", "target_id": 2 },
    { "type": "insert", "target_id": 4, "content": "Inserted information after message 4" }
   ]
}
```

- **Client-Side Display**: When an `insert` action is received, the client updates the chat history to include the new message at the specified position.
- **Client-Side Display**: Each time a response is received, the client displays the full, updated history, reflecting any modifications from Auto’s actions.

---

### 7. **Frontend-Backend Communication**

1. **Message Submission**: When the user submits a message, `client/script.js` sends it to the server’s `/chat` endpoint.
2. **Response Handling**: The server processes the message, sends it to the Gemini model via LangChain, and applies any commands found in the response.
3. **Chat History Rendering**: The client receives the full chat history (including any modifications from Auto) and re-renders it to keep the display synchronized.

---

### 8. **Implementation Notes & Next Steps**

- **Memory Constraints**: Currently, Auto’s chat history is stored in memory, which will eventually grow. Moving the history to persistent storage (e.g., a database) or implementing history trimming will likely be necessary.
- **Further Actions**: As Auto evolves, more sophisticated command handling can be added, allowing for structured system management tasks.
- **Testing Commands**: Additional testing of Auto's structured response parsing will ensure robust handling of history modifications.

