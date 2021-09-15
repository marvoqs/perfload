const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/perfData", { useNewUrlParser: true });
const Machine = require("./models/Machine");

const KEY_CLIENT_NODE = "fdsakf8734hf4hf8q3fba8yb4f8ybbf";
const KEY_CLIENT_UI = "f8asdf86dsrf56sdvsd7v283beb";

function socketMain(io, socket) {
  let macA;

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

  // A machine has connected, check to see if it's new
  // if it is, add it!
  socket.on("initPerfData", (data) => {
    macA = data.macA;
    // Now go check mongo
  });

  socket.on("perfData", (data) => {
    // console.log({ data });
  });
}

module.exports = socketMain;
