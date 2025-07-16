export function simulateCircuit(modules, connections) {
  const newModules = [...modules];
  connections.forEach(({ from, to }) => {
    const [fromId] = from.split(":");
    const [toId] = to.split(":");
    const fromMod = newModules.find(m => m.id.toString() === fromId);
    const toMod = newModules.find(m => m.id.toString() === toId);
    if (fromMod && toMod) {
      toMod.signal = fromMod.signal + 1;
    }
  });
  return newModules;
}