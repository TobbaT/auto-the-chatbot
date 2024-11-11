document.addEventListener("DOMContentLoaded", () => {
    const chatHistory = document.getElementById("chat-history");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");
  
    // Function to append messages to chat history
    function appendMessage(content, sender) {
      const messageDiv = document.createElement("div");
      messageDiv.classList.add("message", sender === "user" ? "user-message" : "bot-message");
      messageDiv.textContent = content;
      chatHistory.appendChild(messageDiv);
      chatHistory.scrollTop = chatHistory.scrollHeight;
    }
  
    // Send message to server and handle response
    async function sendMessage() {
      const message = userInput.value.trim();
      if (!message) return;
  
      appendMessage(message, "user");
      userInput.value = "";
  
      try {
        const response = await fetch("/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        });
  
        if (response.ok) {
          const data = await response.json();
          appendMessage(data.reply, "bot");
        } else {
          appendMessage("Error: Unable to get a response", "bot");
        }
      } catch (error) {
        console.error("Error:", error);
        appendMessage("Error: Network issue", "bot");
      }
    }
  
    // Event listeners
    sendButton.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
  });
  