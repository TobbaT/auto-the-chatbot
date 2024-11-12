document.addEventListener("DOMContentLoaded", () => {
  const chatHistory = document.getElementById("chat-history");
  const userInput = document.getElementById("user-input");
  const sendButton = document.getElementById("send-button");

  // Function to append messages to chat history
  function appendMessage(role, content) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", role === "user" ? "user-message" : "bot-message");
    messageDiv.textContent = content;
    chatHistory.appendChild(messageDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }

  // Send message to server and handle response
  async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage("user", message);
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
        // chatHistory does need to be cleared before we reload the history.
        chatHistory.innerHTML = "";
        // Append each message from the history to the chat, except for system messages
        data.history.forEach(({ role, content }) => {
          if (role !== "system") {
            appendMessage(role, content);
          }  
        });
      } else {
        console.error("Failed to send message:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  // Event listener for send button
  sendButton.addEventListener("click", sendMessage);

  // Event listener for Enter key
  userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  });
});