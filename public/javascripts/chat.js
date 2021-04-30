const socket = io.connect("https://chatty-mehedi.herokuapp.com/");

// Doms
const send_btn = document.getElementById("send"),
    out = document.getElementById("out"),
    user_name = document.getElementById("user_name"),
    message = document.getElementById("message"),
    feedback = document.getElementById("feedback");


// Data Receiver
socket.on("_reqUserName", (data) => {
    if(data) {
        socket.emit("_userName", user_name.value);
        appendMessage("You have joined the Chat!");
    }
})

socket.on("_userName", (data) => {
    appendMessage(`${data} has joined the chat`);
})

socket.on("message", (data) => {
    appendMessage(data.message, data.user_name, "user")
})

// data sender

send_btn.addEventListener("click", () => {
    if(message.value.trim())
        socket.emit("message", {
            message: message.value,
            user_name: user_name.value
        })
})

// Utils
function appendMessage(message = "", name = "[Server]", className = "server") {
        out.innerHTML += `<p><b class="${className}">${name}:</b> ${message}</p>`;
}


