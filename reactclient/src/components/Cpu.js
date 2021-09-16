import drawCircle from "../utilities/drawCircle";

const Cpu = ({ data: { cpuLoad } }) => {
  const canvas = document.querySelector("canvas");
  drawCircle(canvas, cpuLoad);

  return (
    <div className="col-sm3 cpu">
      <h3>CPU Load</h3>
      <div className="canvas-wrapper">
        <canvas className="canvas"></canvas>
        <div className="cpu-text">{cpuLoad}</div>
      </div>
    </div>
  );
};

export default Cpu;
