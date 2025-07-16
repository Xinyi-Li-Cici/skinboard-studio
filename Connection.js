import React from "react";

export default function Connection({ from, to, modules }) {
  const getPinPosition = (idPin) => {
    const [id, pin] = idPin.split(":");
    const mod = modules.find(m => m.id.toString() === id);
    if (!mod) return { x: 0, y: 0 };
    const offset = pin.startsWith("in") ? 5 : 75;
    return { x: mod.x + offset, y: mod.y + 35 };
  };
  const p1 = getPinPosition(from);
  const p2 = getPinPosition(to);
  return <line x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="black" />;
}