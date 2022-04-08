import { Point2D } from "../../../types";

export function getBearing(p1: Point2D, p2: Point2D): number {
  let r = Math.atan2(p2.x - p1.x, p2.y - p1.y);
  if (r < 0) {
    r += 2 * Math.PI;
  }
  const d = r * 180 / Math.PI;
  return 2 * (d <= 180 ? 90 : 270) - d;
}

export function getDistance(p1: Point2D, p2: Point2D): number {
  return getHypotenuse(p2.x - p1.x, p2.y - p1.y);
}

export function getHypotenuse(length1: number, length2: number): number {
  return Math.sqrt(length1 * length1 + length2 * length2);
}