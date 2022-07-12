import Ant from "./Ant";
import { defaultDeltaTau, defaultEta } from "./const";
import { AntColonyOptimizationOptions, Point } from "./types";
import { findBestAnt } from "./utils";

export default class AntColonyOptimization {
  pointArray: Array<Point>;

  /**
   * 距离矩阵
   */
  pointDistanceMatrix: number[][];

  /**
   * 启发式因子矩阵
   */
  etaMatrix: number[][];

  /**
   * 信息素矩阵
   */
  tauMatrix: number[][];

  iterationLength: number;

  antLength: number;

  deltaTau: (distance: number) => number;

  leftTau: number;

  alpha: number;

  beta: number;

  minTau: number;

  maxTau: number;

  maxX: number;

  maxY: number;

  constructor({
    pointLength = 10,
    maxX = 1000,
    maxY = 1000,
    iterationLength,
    antLength,
    eta = defaultEta,
    alpha = 1,
    beta = 1,
    initTau,
    deltaTau = defaultDeltaTau,
    leftTau = 0.1,
    minTau,
    maxTau,
  }: AntColonyOptimizationOptions) {
    this.iterationLength = iterationLength;
    this.antLength = antLength;
    this.deltaTau = deltaTau;
    this.leftTau = leftTau;
    this.alpha = alpha;
    this.beta = beta;
    this.minTau = minTau;
    this.maxTau = maxTau;
    this.maxX = maxX;
    this.maxY = maxY;

    /**
     * 初始化点数组
     */
    this.pointArray = new Array<number>(pointLength).fill(0).map(() => {
      return {
        x: Math.floor(Math.random() * maxX),
        y: Math.floor(Math.random() * maxY),
      };
    });

    /**
     * 初始化距离矩阵
     */
    this.pointDistanceMatrix = new Array(pointLength)
      .fill(0)
      .map(() => new Array(pointLength).fill(0));

    for (let i = 0; i < pointLength; i++) {
      for (let j = 0; j < pointLength; j++) {
        const first = this.pointArray[i];
        const second = this.pointArray[j];
        this.pointDistanceMatrix[i][j] = Math.sqrt(
          Math.pow(first.x - second.x, 2) + Math.pow(first.y - second.y, 2)
        );
      }
    }

    /**
     * 初始化启发式因子矩阵
     */
    this.etaMatrix = new Array(pointLength)
      .fill(0)
      .map(() => new Array(pointLength).fill(0));

    for (let i = 0; i < pointLength; i++) {
      for (let j = 0; j < pointLength; j++) {
        this.etaMatrix[i][j] = eta(this.pointDistanceMatrix[i][j]);
      }
    }

    /**
     * 初始化信息素矩阵
     */
    this.tauMatrix = new Array(pointLength)
      .fill(0)
      .map(() => new Array(pointLength).fill(initTau));
  }

  run() {
    const antArray: Ant[] = [];
    for (let i = 0; i < this.iterationLength; i++) {
      const ant = this.singleIterate();
      console.log(`第 ${i} 次迭代，最短距离为 ${ant.distance}`);
      antArray.push(ant);

      /**
       * 精英蚂蚁系统
       */
      const bestAnt = findBestAnt(antArray);
      this.updateTau([bestAnt, bestAnt, bestAnt]);
    }
    return findBestAnt(antArray);
  }

  /**
   * 获得可能性矩阵
   */
  getProbabilityMatrix() {
    const probabilityMatrix: number[][] = new Array(this.pointArray.length)
      .fill(0)
      .map(() => new Array(this.pointArray.length).fill(0));

    for (let i = 0; i < this.pointArray.length; i++) {
      for (let j = 0; j < this.pointArray.length; j++) {
        probabilityMatrix[i][j] =
          Math.pow(this.tauMatrix[i][j], this.alpha) *
          Math.pow(this.etaMatrix[i][j], this.beta);
      }
    }

    return probabilityMatrix;
  }

  /**
   * 一次迭代
   */
  singleIterate() {
    const probabilityMatrix = this.getProbabilityMatrix();

    const antArray = new Array(this.pointArray.length).fill(0).map(() => {
      return new Ant({
        probabilityMatrix,
        pointDistanceMatrix: this.pointDistanceMatrix,
      });
    });

    antArray.forEach((ant) => ant.iterate());

    this.updateTau(antArray);

    return findBestAnt(antArray);
  }

  updateTau(antArray: Ant[]) {
    const deltaTauMatrix: number[][] = new Array(this.pointArray.length)
      .fill(0)
      .map(() => new Array(this.pointArray.length).fill(0));

    antArray.forEach((ant) => {
      for (let index = 1; index < ant.traveledPointArray.length; index++) {
        const currentPoint = ant.traveledPointArray[index - 1];
        const nextPoint = ant.traveledPointArray[index];
        const deltaTau = this.deltaTau(ant.distance);
        deltaTauMatrix[currentPoint][nextPoint] += deltaTau;
        deltaTauMatrix[nextPoint][currentPoint] += deltaTau;
      }
    });

    for (let i = 0; i < this.pointArray.length; i++) {
      for (let j = 0; j < this.pointArray.length; j++) {
        const tau = this.tauMatrix[i][j] * this.leftTau + deltaTauMatrix[i][j];
        /**
         * 最大最小蚂蚁系统
         */
        this.tauMatrix[i][j] = Math.max(
          Math.min(tau, this.maxTau),
          this.minTau
        );
      }
    }
  }
}
