function drawCircle(canvas, currentLoad) {
  if (!canvas) return;

  let context = canvas.getContext("2d");
  // Draw Inner Circle
  context.clearRect(0, 0, 500, 500);
  context.fillStyle = "#ccc";
  context.beginPath();
  context.arc(100, 100, 90, Math.PI * 0, Math.PI * 2);
  context.closePath();
  context.fill();

  // Draw the outter line
  // 10px wide line
  context.lineWidth = 10;
  context.strokeStyle = ((load) => {
    if (load < 20) return "#00ff00";
    if (load < 40) return "#337ab7";
    if (load < 60) return "#f0ad4e";
    return "#d9534f";
  })(currentLoad);
  context.beginPath();
  context.arc(
    100,
    100,
    95,
    Math.PI * 1.5,
    (Math.PI * 2 * currentLoad) / 100 + Math.PI * 1.5
  );
  context.stroke();
}

export default drawCircle;
