import { useEffect, useState } from "react";
import "./App.css";
import AntColonyOptimization from "./ACO";
import Ant from "./Ant";

const aco = new AntColonyOptimization({
  pointLength: 10,
  antLength: 5,
  iterationLength: 500,
  initTau: 10,
  minTau: 1,
  maxTau: 1000,
  leftTau: 0.5,
  alpha: 2,
  beta: 4,
});

window.aco = aco;

function App() {
  const [ant, setAnt] = useState<Ant>();

  useEffect(() => {
    setAnt(aco.run());
  }, []);

  return (
    <>
      <svg width={aco.maxX} height={aco.maxY}>
        {aco.pointArray.map((point, index) => {
          return (
            <circle key={index} cx={point.x} cy={point.y} r={5} fill="black" />
          );
        })}
        {ant &&
          ant.traveledPointArray.map((currentPointIndex, index) => {
            const nextPointIndex =
              ant.traveledPointArray[index + 1] ?? ant.traveledPointArray[0];
            const currentPoint = aco.pointArray[currentPointIndex];
            const nextPoint = aco.pointArray[nextPointIndex];
            return (
              <line
                key={index}
                x1={currentPoint.x}
                y1={currentPoint.y}
                x2={nextPoint?.x ?? currentPoint.x}
                y2={nextPoint?.y ?? currentPoint.y}
                fill="black"
                stroke="black"
                strokeWidth={2}
              />
            );
          })}
      </svg>
      <div>min distance: {ant?.distance}</div>
    </>
  );
}

export default App;
