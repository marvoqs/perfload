import io from "socket.io-client";
let socket = io.connect("http://localhost:8181");

socket.emit("clientAuth", "f8asdf86dsrf56sdvsd7v283beb");

console.log({ socket });

export default socket;
