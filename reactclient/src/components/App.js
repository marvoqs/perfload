import { useEffect, useState } from "react";
import socket from "../utilities/socketConnection";

import Widget from "./Widget";

function App() {
  const [performanceData, setPerformanceData] = useState({});

  useEffect(() => {
    socket.on("data", (data) => {
      setPerformanceData(data);
    });
  }, []);

  console.log({ performanceData });

  return (
    <>
      <Widget />
    </>
  );
}

export default App;
