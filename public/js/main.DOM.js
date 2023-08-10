// Automatically remove flash messages after 3 seconds
setTimeout(() => {
    const flashMessages = document.querySelectorAll(".errors");
    flashMessages.forEach((message) => {
        message.remove();
    });
}, 3000);



let currentURL = window.location.href;

// Split the URL by slashes and get the last part
var parts = currentURL.split('/');
var lastPart = parts[parts.length - 1];

let selectedTown = document.querySelector(`#${lastPart}`)

selectedTown.classList.add("selected-card")
