import React, { useState } from "react";

export default function Module({ data, onUpdate, onConnect }) {
  const [dragging, setDragging] = useState(false);

  const startDrag = () => setDragging(true);
  const stopDrag = () => setDragging(false);
  const doDrag = (e) => {
    if (!dragging) return;
    onUpdate({ ...data, x: e.clientX, y: e.clientY });
  };

  return (
    <g transform={`translate(${data.x},${data.y})`}
       onMouseDown={startDrag}
       onMouseMove={doDrag}
       onMouseUp={stopDrag}>
      <rect width="80" height="40" fill="lightblue" stroke="black" />
      <text x="5" y="20">{data.type}</text>
      <circle cx="5" cy="35" r="5" fill="red" onClick={() => onConnect(data.id + ":in1")} />
      <circle cx="75" cy="35" r="5" fill="green" onClick={() => onConnect(data.id + ":out1")} />
      <text x="5" y="10" fontSize="10">Signal: {data.signal}</text>
    </g>
  );
}