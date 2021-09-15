// The node program that captures local performance data
// and sends it up to the socket.io server
// req:
// - farmhash
// - socket.io-client

const os = require("os");
const io = require("socket.io-client");
let socket = io("http://127.0.0.1:8181");

socket.on("connect", () => {
  console.log("I am connected to the socket server... hooray!");
});

function performanceData() {
  return new Promise(async (resolve, reject) => {
    const cpus = os.cpus();

    // Memory Usage
    const freeMem = os.freemem();
    const totalMem = os.totalmem();
    const usedMem = totalMem - freeMem;
    const memUsage = Math.floor((usedMem / totalMem) * 100) / 100;
    // OS type
    const osType = os.type() == "Darwin" ? "Mac" : os.type();
    // Uptime
    const uptime = os.uptime();
    // CPU info
    const cpuModel = cpus[0].model;
    const numCores = cpus.length;
    const cpuSpeed = cpus[0].speed;

    const cpuLoad = await getCpuLoad();

    resolve({
      freeMem,
      totalMem,
      usedMem,
      memUsage,
      osType,
      uptime,
      cpuModel,
      numCores,
      cpuSpeed,
      cpuLoad,
    });
  });
}

// cpus is all cores, we need the average of all the cores which
// will give us the cpu average
function cpuAverage() {
  const cpus = os.cpus();
  // Get ms in each mode, BUT this number is since reboot
  // so get it now, and get it in 100ms and compare
  let idleMs = 0;
  let totalMs = 0;
  // Loop through each core
  cpus.forEach((aCore) => {
    // Loop through each property of the current core
    for (type in aCore.times) {
      totalMs += aCore.times[type];
    }
    idleMs += aCore.times.idle;
  });

  return {
    idle: idleMs / cpus.length,
    total: totalMs / cpus.length,
  };
}

// Because the times property is time since boot, we will get
// now times, and 100 ms from now time. Compare them, that will
// give us current Load
function getCpuLoad() {
  return new Promise((resolve, reject) => {
    const start = cpuAverage();
    setTimeout(() => {
      const end = cpuAverage();
      const idleDifference = end.idle - start.idle;
      const totalDifference = end.total - start.total;

      // Calculate the % of used CPU
      const percentageCpu =
        100 - Math.floor((100 * idleDifference) / totalDifference);

      resolve(percentageCpu);
    }, 100);
  });
}

performanceData().then((allPerformanceData) => {
  console.log({ allPerformanceData });
});
