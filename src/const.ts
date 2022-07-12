export function defaultEta(distance: number): number {
  return 1 / distance;
}

/**
 * Q / distance
 */
export function defaultDeltaTau(distance: number): number {
  return 30000 / distance;
}
