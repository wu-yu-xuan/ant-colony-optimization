import Ant from "./Ant";

/**
 * 轮盘赌算法
 */
export function random(array: [number, number][]) {
  const probabilityArray = array.map((x) => x[1]);
  const sum = probabilityArray.reduce((a, b) => a + b, 0);
  const random = Math.random() * sum;
  let total = 0;
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    total += element[1];
    if (random < total) {
      return element[0];
    }
  }
  return array[array.length - 1][0];
}

export function findBestAnt(antArray: Ant[]) {
  return antArray.reduce((acc, cur) => {
    if (cur.traveledPointArray.length > acc.traveledPointArray.length) {
      /**
       * 必须得先成功周游世界，这比未能完成周游世界的蚂蚁优秀
       */
      return cur;
    }
    if (cur.distance < acc.distance) {
      return cur;
    }
    return acc;
  });
}
