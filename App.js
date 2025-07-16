import React, { useState } from "react";
import Module from "./Module";
import Connection from "./Connection";
import { simulateCircuit } from "./simulation";
import { loadDemoCircuit, exportToJSON } from "./utils";

export default function App() {
  const [modules, setModules] = useState([]);
  const [connections, setConnections] = useState([]);

  const addModule = (type) => {
    const newModule = {
      id: Date.now(),
      type,
      x: 100,
      y: 100,
      pins: ["in1", "out1"],
      signal: 0,
    };
    setModules([...modules, newModule]);
  };

  const updateModule = (updated) => {
    setModules(modules.map(m => m.id === updated.id ? updated : m));
  };

  const addConnection = (from, to) => {
    setConnections([...connections, { from, to }]);
  };

  const runSimulation = () => {
    const updated = simulateCircuit(modules, connections);
    setModules(updated);
  };

  return (
    <div>
      <h1>SkinBoard Studio v6.2</h1>
      <button onClick={() => addModule("EMG")}>Add Module</button>
      <button onClick={runSimulation}>Simulate</button>
      <button onClick={() => {
        const demo = loadDemoCircuit();
        setModules(demo.modules);
        setConnections(demo.connections);
      }}>Load Demo Circuit</button>
      <button onClick={() => exportToJSON(modules, connections)}>Export JSON</button>
      <svg width="100%" height="600px" style={{ border: "1px solid gray" }}>
        {connections.map((conn, i) => (
          <Connection key={i} from={conn.from} to={conn.to} modules={modules} />
        ))}
        {modules.map(mod => (
          <Module key={mod.id} data={mod} onUpdate={updateModule} onConnect={addConnection} />
        ))}
      </svg>
    </div>
  );
}