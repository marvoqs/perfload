import { useEffect, useState } from "react";
import "./App.css";
import socket from "./utilities/socketConnection";

function App() {
  const [performanceData, setPerformanceData] = useState({});

  useEffect(() => {
    socket.on("data", (data) => {
      setPerformanceData(data);
    });
  }, []);

  console.log({ performanceData });

  return <>Hello</>;
}

export default App;
