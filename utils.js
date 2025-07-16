export function loadDemoCircuit() {
  return {
    modules: [
      { id: 1, type: "EMG", x: 100, y: 100, pins: ["in1", "out1"], signal: 1 },
      { id: 2, type: "MCU", x: 250, y: 100, pins: ["in1", "out1"], signal: 0 },
      { id: 3, type: "LED", x: 400, y: 100, pins: ["in1", "out1"], signal: 0 },
    ],
    connections: [
      { from: "1:out1", to: "2:in1" },
      { from: "2:out1", to: "3:in1" },
    ]
  };
}

export function exportToJSON(modules, connections) {
  const dataStr = JSON.stringify({ modules, connections }, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "skinboard_circuit.json";
  a.click();
  URL.revokeObjectURL(url);
}