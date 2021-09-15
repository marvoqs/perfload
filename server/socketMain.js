const KEY_CLIENT_NODE = "fdsakf8734hf4hf8q3fba8yb4f8ybbf";
const KEY_CLIENT_UI = "f8asdf86dsrf56sdvsd7v283beb";

function socketMain(io, socket) {
  // console.log("A socket connected!", socket.id);

  socket.on("clientAuth", (key) => {
    switch (key) {
      case KEY_CLIENT_NODE:
        socket.join("clients");
        break;
      case KEY_CLIENT_UI:
        socket.join("ui");
        break;
      default:
        socket.disconnect(true);
        console.log("Client was disconnected due to invalid key.");
    }
  });

  socket.on("perfData", (data) => {
    console.log({ data });
  });
}

module.exports = socketMain;
