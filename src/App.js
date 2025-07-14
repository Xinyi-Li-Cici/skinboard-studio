import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function SkinBoardDesigner() {
  const [modules, setModules] = useState([]);
  const [traceWidth, setTraceWidth] = useState(2);
  const [draggingId, setDraggingId] = useState(null);

  const addModule = (type) => {
    setModules([
      ...modules,
      {
        type,
        x: Math.random() * 2 - 1,
        y: Math.random() * 2 - 1,
        id: Date.now() + Math.random(),
      },
    ]);
  };

  const handleDragStart = (id) => {
    setDraggingId(id);
  };

  const handleDrag = (e) => {
    if (draggingId === null) return;
    const bounds = e.target.getBoundingClientRect();
    const x = ((e.clientX - bounds.left) / bounds.width) * 4 - 2;
    const y = -(((e.clientY - bounds.top) / bounds.height) * 4 - 2);
    setModules((mods) =>
      mods.map((m) => (m.id === draggingId ? { ...m, x, y } : m))
    );
  };

  const handleDragEnd = () => {
    setDraggingId(null);
  };

  return (
    <div className="flex h-screen w-full">
      <div
        className="flex-1 bg-gray-100"
        onMouseMove={handleDrag}
        onMouseUp={handleDragEnd}
      >
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <OrbitControls />
          {modules.map((mod) => (
            <mesh
              key={mod.id}
              position={[mod.x, mod.y, 0]}
              onPointerDown={() => handleDragStart(mod.id)}
            >
              <boxGeometry args={[0.4, 0.4, 0.1]} />
              <meshStandardMaterial color="orange" />
            </mesh>
          ))}
        </Canvas>
      </div>

      <div className="w-96 p-4 bg-white border-l border-gray-300 space-y-4 overflow-y-auto">
        <div className="space-y-2 p-4">
          <h2 className="font-semibold">添加模块</h2>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => addModule("EMG")}>EMG</button>
            <button onClick={() => addModule("HR")}>心率</button>
            <button onClick={() => addModule("Temp")}>温度</button>
            <button onClick={() => addModule("MPU")}>IMU</button>
          </div>
        </div>

        <div className="space-y-2 p-4">
          <h2 className="font-semibold">铜线路径宽度</h2>
          <input
            type="range"
            min={1}
            max={5}
            step={1}
            value={traceWidth}
            onChange={(e) => setTraceWidth(parseInt(e.target.value))}
          />
          <p>当前宽度：{traceWidth}px</p>
        </div>

        <div className="space-y-2 p-4">
          <h2 className="font-semibold">导出设计</h2>
          <button className="w-full border px-2 py-1">导出为 JSON</button>
          <button className="w-full border px-2 py-1">导出为 PNG</button>
        </div>
      </div>
    </div>
  );
}
