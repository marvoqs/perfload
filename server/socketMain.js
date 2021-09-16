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
        console.log("A react client has joined.");
        break;
      default:
        socket.disconnect(true);
        console.log("Client was disconnected due to invalid key.");
    }
  });

  // A machine has connected, check to see if it's new
  // if it is, add it!
  socket.on("initPerfData", async (data) => {
    macA = data.macA;
    const mongooseResponse = await checkAndAdd(data);
    console.log({ mongooseResponse });
  });

  socket.on("perfData", (data) => {
    console.log("Tick...");
    io.to("ui").emit("data", data);
  });
}

function checkAndAdd(data) {
  // Because we are doing db stuff, JS won't wait for the db
  // so we need to make this a promise
  return new Promise((resolve, reject) => {
    Machine.findOne({ macA: data.macA }, (err, doc) => {
      if (err) {
        reject(err);
      } else if (doc === null) {
        // These are the droids we're looking for!
        // The record is not in the dv, so add it!
        let newMachine = new Machine(data);
        newMachine.save();
        resolve("added");
      } else {
        resolve("found");
      }
    });
  });
}

module.exports = socketMain;
