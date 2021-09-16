import { useRef } from "react";
import drawCircle from "../utilities/drawCircle";

const Cpu = ({ data: { cpuLoad } }) => {
  const canvasRef = useRef();
  drawCircle(canvasRef.current, cpuLoad);

  return (
    <div className="col-sm-3 cpu">
      <h3>CPU Load</h3>
      <div className="canvas-wrapper">
        <canvas
          className="canvas"
          height="200"
          ref={canvasRef}
          width="200"
        ></canvas>
        <div className="cpu-text">{cpuLoad}%</div>
      </div>
    </div>
  );
};

export default Cpu;
