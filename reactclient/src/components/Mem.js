import { useRef } from "react";
import drawCircle from "../utilities/drawCircle";

const Mem = ({ data: { freeMem, totalMem, memUsage } }) => {
  const canvasRef = useRef();
  const memUsageInPercents = memUsage * 100;
  const totalMemInGb = totalMem / (1024 * 1024 * 1024);
  const freeMemInGb = Math.round(freeMem / (1024 * 1024 * 1024));
  drawCircle(canvasRef.current, memUsageInPercents);

  return (
    <div className="col-sm-3 cpu">
      <h3>Memory Usage</h3>
      <div className="canvas-wrapper">
        <canvas
          className="canvas"
          height="200"
          ref={canvasRef}
          width="200"
        ></canvas>
        <div className="cpu-text">{memUsageInPercents}%</div>
        <div>Total Memory: {totalMemInGb} GB</div>
        <div>Free Memory: {freeMemInGb} GB</div>
      </div>
    </div>
  );
};

export default Mem;
