import { useEffect, useState } from "react";
import AntColonyOptimization from "./ACO";
import Ant from "./Ant";

const initPointLength = 10;

const aco = new AntColonyOptimization({
  pointLength: initPointLength,
  antLength: 5,
  iterationLength: 500,
  initTau: 10,
  minTau: 10,
  maxTau: 100,
  leftTau: 0.5,
  alpha: 2,
  beta: 2,
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
          const isNew =
            index >= initPointLength && index === aco.pointArray.length - 1;
          return (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={5}
              fill={isNew ? "red" : "black"}
            />
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
      <div>
        min distance: {ant?.distance}
        <button onClick={() => setAnt(aco.addPointAndRerun())}>
          add point and rerun
        </button>
      </div>
    </>
  );
}

export default App;
