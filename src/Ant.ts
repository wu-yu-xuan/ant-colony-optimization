import { AntOptions } from "./types";
import { random } from "./utils";

/**
 * 蚂蚁
 */
export default class Ant {
  /**
   * 已经旅行过的点
   */
  traveledPointArray: Array<number>;

  probabilityMatrix: number[][];

  /**
   * 距离矩阵
   */
  pointDistanceMatrix: number[][];

  /**
   * 走过的里程
   */
  distance: number;

  constructor({ probabilityMatrix, pointDistanceMatrix }: AntOptions) {
    this.distance = 0;

    this.probabilityMatrix = probabilityMatrix;

    this.pointDistanceMatrix = pointDistanceMatrix;

    /**
     * 初始点
     */
    this.traveledPointArray = [
      Math.floor(Math.random() * this.probabilityMatrix.length),
    ];
  }

  iterate() {
    while (this.traveledPointArray.length !== this.probabilityMatrix.length) {
      this.singleIterate();
    }
    this.distance +=
      this.pointDistanceMatrix[0][this.traveledPointArray.length - 1];
  }

  /**
   * 单次迭代
   */
  singleIterate() {
    const currentPoint =
      this.traveledPointArray[this.traveledPointArray.length - 1];
    const nextPoint = this.getNextPoint();
    this.traveledPointArray.push(nextPoint);
    this.distance += this.pointDistanceMatrix[currentPoint][nextPoint];
  }

  getNextPoint() {
    const currentPoint =
      this.traveledPointArray[this.traveledPointArray.length - 1];

    /**
     * 可以去的下一个点及其概率
     */
    const availablePoint: [number, number][] = Object.entries(
      this.probabilityMatrix[currentPoint]
    )
      .filter(([point]) => {
        return !this.traveledPointArray.includes(Number(point));
      })
      .map(([point, probability]) => [Number(point), probability]);

    return random(availablePoint);
  }
}
