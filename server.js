const express = require("express");
const socket = require("socket.io");
const ejs = require("ejs");
const indexRoutes = require("./routes/main");
const chatRoutes = require("./routes/chat");
const adminRoutes = require("./routes/admin");

// Server setup
const app = express();
const server = app.listen(3000, () => console.log(`Server is Listening to ${3000}`));

app.set("view engine", ejs);
app.use(express.static("public"));
app.use(express.json())


/**
 * @type {socket.Server}
 */
const io = socket(server);

// Handle Connection
io.on("connection", (socket) => {

    // Handle Events
    console.log("Connected with ID: ", socket.id);

    // socket.broadcast.emit("_joined", true)
    socket.emit("_reqUserName", true)

    socket.on("_userName", (data) => {
        // io.sockets.emit("_userName", data);
        socket.broadcast.emit("_userName", data)
    })

    socket.on("message", data => {
        io.sockets.emit("message", data)
    })

});

app.use("/", indexRoutes)
app.use("/chat", chatRoutes)
app.use("/admin", adminRoutes)

