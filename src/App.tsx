import { useEffect, useState } from "react";
import AntColonyOptimization from "./ACO";
import Ant from "./Ant";
import styles from "./styles.module.less";

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

  const [visualProbabilityMatrix, setVisualProbabilityMatrix] =
    useState<number[][]>();

  useEffect(() => {
    setAnt(aco.run());
  }, []);

  const pointNode = aco.pointArray.map((point, index) => {
    const isNew =
      index >= initPointLength && index === aco.pointArray.length - 1;
    return (
      <circle
        key={`circle-${index}`}
        cx={point.x}
        cy={point.y}
        r={5}
        fill={isNew ? "red" : "black"}
      />
    );
  });

  const antTraveledNode =
    ant &&
    ant.traveledPointArray.map((currentPointIndex, index) => {
      const nextPointIndex =
        ant.traveledPointArray[index + 1] ?? ant.traveledPointArray[0];
      const currentPoint = aco.pointArray[currentPointIndex];
      const nextPoint = aco.pointArray[nextPointIndex];
      return (
        <line
          key={`travel-${index}`}
          x1={currentPoint.x}
          y1={currentPoint.y}
          x2={nextPoint?.x ?? currentPoint.x}
          y2={nextPoint?.y ?? currentPoint.y}
          strokeWidth={2}
          className={styles.line}
          onClick={() =>
            setAnt(aco.banPathAndRerun([currentPointIndex, nextPointIndex]))
          }
        />
      );
    });

  const banPathNode = aco.banPathMatrix.map(([index1, index2]) => {
    const point1 = aco.pointArray[index1];
    const point2 = aco.pointArray[index2];
    return (
      <line
        key={["ban", index1, index2].join(",")}
        x1={point1.x}
        y1={point1.y}
        x2={point2.x}
        y2={point2.y}
        fill="red"
        stroke="red"
        strokeWidth={2}
      />
    );
  });

  const visualLineNode = visualProbabilityMatrix
    ? visualProbabilityMatrix.map((row, i) => {
        return row.slice(i + 1).map((opacity, j) => {
          const point1 = aco.pointArray[i];
          const point2 = aco.pointArray[j + i + 1];
          return (
            <line
              key={["visual", i, j + i].join(",")}
              x1={point1.x}
              y1={point1.y}
              x2={point2.x}
              y2={point2.y}
              strokeWidth={4 * opacity}
              strokeOpacity={opacity}
              stroke="black"
            />
          );
        });
      })
    : null;

  return (
    <>
      <svg width={aco.maxX} height={aco.maxY}>
        {pointNode}
        {antTraveledNode}
        {banPathNode}
        {visualLineNode}
      </svg>
      <div>
        min distance: {ant?.distance}
        <button onClick={() => setAnt(aco.run())}>rerun</button>
        <button onClick={() => setAnt(aco.addPointAndRerun())}>
          add point and rerun
        </button>
        <button
          onClick={() => {
            setAnt(undefined);
            aco.init();
            setVisualProbabilityMatrix(aco.getVisualProbabilityMatrix());
          }}
        >
          init and prepare run visually
        </button>
        <button
          onClick={() =>
            setVisualProbabilityMatrix(aco.singleIterateVisually())
          }
        >
          single iterate visually
        </button>
      </div>
    </>
  );
}

export default App;
