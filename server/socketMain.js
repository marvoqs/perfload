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
        console.log(
          `[socket ${socket.id}]`,
          "\x1b[31m",
          "A node client has joined.",
          "\x1b[0m"
        );
        break;
      case KEY_CLIENT_UI:
        socket.join("ui");
        console.log(
          `[socket ${socket.id}]`,
          "\x1b[34m",
          "A react client has joined.",
          "\x1b[0m"
        );
        Machine.find({}, (err, docs) => {
          docs.forEach((machine) => {
            // On load, assume that all machines are offline
            machine.isActive = false;
            io.to("ui").emit("data", machine);
          });
        });
        break;
      default:
        socket.disconnect(true);
        console.log(
          `[socket ${socket.id}]`,
          "\x1b[37m",
          "Client was disconnected due to invalid key.",
          "\x1b[0m"
        );
    }
  });

  socket.on("disconnect", () => {
    Machine.find({ macA }, (err, docs) => {
      if (docs.length > 0) {
        // Send one last emit to React
        docs[0].isActive = false;
        io.to("ui").emit("data", docs[0]);
      }
    });
  });

  // A machine has connected, check to see if it's new
  // if it is, add it!
  socket.on("initPerfData", async (data) => {
    macA = data.macA;
    const mongooseResponse = await checkAndAdd(data);
    console.log(
      `[socket ${socket.id}]`,
      "\x1b[35m",
      `Machine "${data.macA}" has been ${mongooseResponse.toUpperCase()}.`,
      "\x1b[0m"
    );
  });

  socket.on("perfData", (data) => {
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
