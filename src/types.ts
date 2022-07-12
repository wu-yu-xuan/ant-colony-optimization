export interface AntColonyOptimizationOptions {
  /**
   * 有多少个点
   */
  pointLength?: number;
  /**
   * 最大的 X 坐标
   */
  maxX?: number;
  /**
   * 最大的 Y 坐标
   */
  maxY?: number;
  /**
   * 迭代次数
   */
  iterationLength: number;
  /**
   * 蚂蚁数量
   */
  antLength: number;
  /**
   * 启发式因子，一般为距离的倒数
   */
  eta?: (distance: number) => number;
  /**
   * 信息素重要程度
   */
  alpha?: number;
  /**
   * 启发式因子重要程度
   */
  beta?: number;
  /**
   * 初始信息素
   */
  initTau: number;
  /**
   * 更新信息素
   */
  deltaTau?: (distance: number) => number;

  /**
   * 挥发后剩下的信息素
   */
  leftTau?: number;

  minTau: number;

  maxTau: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface AntOptions {
  /**
   * 可能性矩阵
   */
  probabilityMatrix: number[][];
  /**
   * 距离矩阵
   */
  pointDistanceMatrix: number[][];
}
