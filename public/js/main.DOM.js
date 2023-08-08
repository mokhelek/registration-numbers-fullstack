// Automatically remove flash messages after 3 seconds
setTimeout(() => {
    const flashMessages = document.querySelectorAll(".errors");
    flashMessages.forEach((message) => {
        message.remove();
    });
}, 3000);



function applyFilter(code) {
   window.location.href = `/${code}`; 
}

const dropDown = document.querySelector("#dropDown");
dropDown.addEventListener("change",function(e){
  applyFilter(e.target.value)
})