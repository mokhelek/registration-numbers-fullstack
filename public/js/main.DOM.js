  // Automatically remove flash messages after 3 seconds
  setTimeout(() => {
    const flashMessages = document.querySelectorAll('.errors');
    flashMessages.forEach(message => {
      message.remove();
    });
  }, 3000); 