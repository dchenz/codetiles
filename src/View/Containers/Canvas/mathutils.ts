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

export function isRectOverlap(top1: Point2D, w1: number, h1: number, top2: Point2D, w2: number, h2: number): boolean {
  return isRectOverlap2Point(top1, { x: top1.x + w1, y: top1.y + h1 }, top2, { x: top2.x + w2, y: top2.y + h2 });
}

export function isRectOverlap2Point(top1: Point2D, bot1: Point2D, top2: Point2D, bot2: Point2D): boolean {
  return !(top2.x > bot1.x ||
    bot2.x < top1.x ||
    top2.y > bot1.y ||
    bot2.y < top1.y);
}
