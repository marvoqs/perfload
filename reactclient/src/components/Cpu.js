import drawCircle from "../utilities/drawCircle";

const Cpu = ({ data: { cpuLoad } }) => {
  const canvas = document.getElementById("cpuCanvas");
  drawCircle(canvas, cpuLoad);

  return (
    <div className="col-sm-3 cpu">
      <h3>CPU Load</h3>
      <div className="canvas-wrapper">
        <canvas
          className="canvas"
          height="200"
          id="cpuCanvas"
          width="200"
        ></canvas>
        <div className="cpu-text">{cpuLoad}%</div>
      </div>
    </div>
  );
};

export default Cpu;
