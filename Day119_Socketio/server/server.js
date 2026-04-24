import app from "../../Day122_GenAi/src/app.js";
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
    console.log("new connection created")

    socket.on("message", (msg) => {
        console.log("new message received");
        console.log(msg)
        io.emit("abc",msg)
    })
});

httpServer.listen(3000, () => {
    console.log("server is running on port 3000")
});