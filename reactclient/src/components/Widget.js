import "../styles/widget.css";

import Cpu from "./Cpu";
import Info from "./Info";
import Mem from "./Mem";

const Widget = ({
  data: {
    freeMem,
    totalMem,
    usedMem,
    memUsage,
    osType,
    upTime,
    cpuModel,
    numCores,
    cpuSpeed,
    cpuLoad,
  },
}) => {
  const cpuData = { cpuLoad };
  const memData = { freeMem, totalMem, usedMem, memUsage };
  const infoData = { osType, upTime, cpuModel, numCores, cpuSpeed };

  return (
    <>
      <h1>Widget</h1>
      <Cpu data={cpuData} />
      <Mem data={memData} />
      <Info data={infoData} />
    </>
  );
};

export default Widget;
