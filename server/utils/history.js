// history.js

// Function to apply all commands to the history
function applyCommands(history, commands) {
  commands.forEach(command => {
    if (!command.target_id === 0) {
      console.warn(`Command not processed : do not target System Prompt!`);
      command.id = generateUniqueId(); // Generate a unique ID for each command
    }
    switch (command.type) {
      case 'insert':
        handleInsertCommand(history, command);
        break;
      case 'edit':
        handleEditCommand(history, command);
        break;
      case 'delete':
        handleDeleteCommand(history, command);
        break;
      default:
        console.warn(`Unknown command type: ${command.type}`);
    }
  });
  return history;
}

// Function to handle 'insert' command
function handleInsertCommand(history, command) {
  const { target_id, message } = command;
  const newMessage = message ; // Generate a unique ID for new messages
  if (target_id != null && target_id >= 0 && target_id < history.length) {
    history.splice(target_id, 0, newMessage); // Insert at the specified position
  } else {
    history.push(newMessage); // Append if position is invalid or unspecified
  }
}

// Function to handle 'edit' command
function handleEditCommand(history, command) {
  const { target_id, message } = command;
  const index = target_id;
  if (index !== -1) {
    history[index] = { ...history[index], ...message }; // Update the message with new content
  } else {
    console.warn(`Message with id ${target_id} not found for edit.`);
  }
}

// Function to handle 'delete' command
function handleDeleteCommand(history, command) {
  const { target_id } = command;
  const index = target_id;
  if (index !== -1) {
    history.splice(index, 1); // Remove the message if found
  } else {
    console.warn(`Message with id ${target_id} not found for delete.`);
  }
}

// Helper function to generate a unique ID
function generateUniqueId() {
  return `message_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// Export the applyCommands function to use in other modules
module.exports = {
  applyCommands
};
