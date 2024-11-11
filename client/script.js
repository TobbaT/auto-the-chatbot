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
  
      appendMessage('user',message);
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
          // Clear the message display area
          chatHistory.innerHTML = "";

          // Render each message in the returned history
          data.history.forEach((msg) => {
            if(msg.role !== "system") {
              appendMessage(msg.role, msg.content);
            }
          });
       } else {
            appendMessage("bot", "Error: Unable to get a response");
        }
          } catch (error) {
          console.log("Error:", error);
          appendMessage("bot", "Error: Network issue");
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

  
  