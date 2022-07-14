export function defaultEta(distance: number): number {
  if (!isFinite(distance)) {
    return 0;
  }
  return 1 / distance;
}

/**
 * Q / distance
 */
export function defaultDeltaTau(distance: number): number {
  if (!isFinite(distance)) {
    return 0;
  }
  return 30000 / distance;
}
