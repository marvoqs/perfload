import drawCircle from "../utilities/drawCircle";

const Mem = ({ data: { freeMem, totalMem, usedMem, memUsage } }) => {
  const canvas = document.getElementById("memCanvas");
  const memUsageInPercents = memUsage * 100;
  const totalMemInGb = totalMem / (1024 * 1024 * 1024);
  const freeMemInGb = Math.round(freeMem / (1024 * 1024 * 1024));
  drawCircle(canvas, memUsageInPercents);

  return (
    <div className="col-sm-3 cpu">
      <h3>Memory Usage</h3>
      <div className="canvas-wrapper">
        <canvas
          className="canvas"
          height="200"
          id="memCanvas"
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
