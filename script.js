// server.js
import { createServer } from "http";
import { Server } from "socket.io";
import { readFile } from "fs/promises";

const server = createServer();
const io = new Server(server);

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("message", (data) => {
        console.log("Message received: ", data);
        io.emit("message", data);
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

const PORT = process.env.PORT || 3000;

// Serve index.html for the homepage
server.on("request", async (request, response) => {
    if (request.url === "/") {
        try {
            const indexHtml = await readFile("index.html");

            response.writeHead(200, { "Content-Type": "text/html" });
            response.end(indexHtml);
        } catch (err) {
            console.error("Error serving index.html:", err);
            response.writeHead(500);
            response.end("Internal Server Error");
        }
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

