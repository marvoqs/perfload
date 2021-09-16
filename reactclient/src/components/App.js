import { useEffect, useState } from "react";
import socket from "../utilities/socket";

import Widget from "./Widget";

function App() {
  const [performanceData, setPerformanceData] = useState({});

  useEffect(() => {
    socket.on("data", (data) => {
      setPerformanceData((prevState) => ({ ...prevState, [data.macA]: data }));
    });
  }, []);

  return (
    <>
      {Object.entries(performanceData).map(([key, value]) => (
        <Widget key={key} data={value} />
      ))}
    </>
  );
}

export default App;
