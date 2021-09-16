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
    isActive,
  },
}) => {
  const cpuData = { cpuLoad };
  const memData = { freeMem, totalMem, usedMem, memUsage };
  const infoData = { osType, upTime, cpuModel, numCores, cpuSpeed };

  return (
    <div className="widget col-sm-12">
      {!isActive && <div className="not-active">Offline</div>}
      <Cpu data={cpuData} />
      <Mem data={memData} />
      <Info data={infoData} />
    </div>
  );
};

export default Widget;
