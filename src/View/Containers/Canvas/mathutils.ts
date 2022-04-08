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
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}