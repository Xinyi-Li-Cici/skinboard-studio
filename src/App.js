
import React, { useState, useRef, useEffect } from "react";

function App() {
  const [modules, setModules] = useState([
    { id: "emg1", type: "emg", x: 100, y: 150 },
    { id: "esp1", type: "esp32", x: 300, y: 150 },
    { id: "led1", type: "led", x: 500, y: 150 }
  ]);

  const [connections] = useState([
    { from: "emg1", to: "esp1" },
    { from: "esp1", to: "led1" }
  ]);

  const dragTarget = useRef(null);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e, id) => {
    dragTarget.current = id;
    const mod = modules.find((m) => m.id === id);
    offset.current = {
      x: e.clientX - mod.x,
      y: e.clientY - mod.y
    };
  };

  const handleMouseMove = (e) => {
    if (!dragTarget.current) return;
    setModules((prev) =>
      prev.map((m) =>
        m.id === dragTarget.current
          ? { ...m, x: e.clientX - offset.current.x, y: e.clientY - offset.current.y }
          : m
      )
    );
  };

  const handleMouseUp = () => {
    dragTarget.current = null;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div style={{ fontFamily: "Arial", padding: 20 }}>
      <h1>SkinBoard Studio v6.1</h1>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "500px",
          background: "#f4f4f4",
          border: "1px solid #ccc"
        }}
      >
        <svg
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 0
          }}
        >
          {connections.map((conn, index) => {
            const from = modules.find((m) => m.id === conn.from);
            const to = modules.find((m) => m.id === conn.to);
            if (!from || !to) return null;
            return (
              <line
                key={index}
                x1={from.x + 50}
                y1={from.y + 25}
                x2={to.x + 50}
                y2={to.y + 25}
                stroke="black"
                strokeWidth={2}
              />
            );
          })}
        </svg>
        {modules.map((mod) => (
          <div
            key={mod.id}
            onMouseDown={(e) => handleMouseDown(e, mod.id)}
            style={{
              position: "absolute",
              left: mod.x,
              top: mod.y,
              width: 100,
              height: 50,
              background: "#fff",
              border: "2px solid #666",
              borderRadius: 8,
              textAlign: "center",
              lineHeight: "50px",
              cursor: "move",
              zIndex: 1
            }}
          >
            {mod.type.toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
