module.exports = function (httpServer) {
    const io = require("socket.io")(httpServer, {
        cors: {
            origin: "*",
        },
    });

    io.use((socket, next) => {
        const username = socket.handshake.auth.username;
        if (!username) {
            return next(new Error("invalid username"));
        }
        socket.username = username;
        next();
    });

    io.on("connection", (socket) => {
        socket.emit("session", {
            username: socket.username,
        });

        // join the "userID" room
        socket.join(socket.username);
        console.log(`${socket.username} joined`);
        // connect mongodb client and update socket.username _id online status = online
        // client.connect((err) => {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         const db = client.db(process.env.MONGODB_DATABASE);
        //         db.collection("Users").updateOne(
        //             { _id: new ObjectId(socket.username) },
        //             { $set: { onlineStatus: "online" } },
        //             (err, result) => {
        //                 if (err) {
        //                     console.log(err);
        //                 } else {
        //                     console.log(result);
        //                 }
        //             }
        //         );
        //     }
        // });

        // forward the private message to the right recipient (and to other tabs of the sender)
        socket.on("initiateCall", ({ content, to }) => {
            console.log("initiateCall", content, to, socket.username);
            socket.to(to).emit("call-received", {
                content,
                from: socket.username,
                to,
            });
        });
        socket.on("call-busy", ({ content, to }) => {
            console.log("call-busy", content, to, socket.username);
            socket.to(to).emit("call-busy", {
                content,
                from: socket.username,
                to,
            });
        });
        socket.on("call-declined", ({ content, to }) => {
            console.log("call-declined", content, to, socket.username);
            socket.to(to).emit("call-declined", {
                content,
                from: socket.username,
                to,
            });
        });
        socket.on("call-accepted", ({ content, to }) => {
            console.log("call-accepted", content, to, socket.username);
            socket.to(to).emit("call-accepted", {
                content,
                from: socket.username,
                to,
            });
        });
        socket.on("bid-placed", ({ content, to }) => {
            console.log("bid-placed", content, to, socket.username);
            socket.to(to).emit("bid-placed", {
                content,
                from: socket.username,
                to,
            });
        });

        // notify users upon disconnection
        socket.on("disconnect", async () => {
            const matchingSockets = await io.in(socket.username).allSockets();
            const isDisconnected = matchingSockets.size === 0;
            if (isDisconnected) {
                // client.connect((err) => {
                //     if (err) {
                //         console.log(err);
                //     } else {
                //         const db = client.db(process.env.MONGODB_DATABASE);
                //         db.collection("Users").updateOne(
                //             { _id: new ObjectId(socket.username) },
                //             { $set: { onlineStatus: "offline" } },
                //             (err, result) => {
                //                 if (err) {
                //                     console.log(err);
                //                 } else {
                //                     console.log(result);
                //                 }
                //             }
                //         );
                //     }
                // });
            }
        });
    });
};
