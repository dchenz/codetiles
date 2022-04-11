import { ProgramObject } from "./ProgramObject";

export class Connector {

  id: string;
  targetId: string | null;
  caption: string;
  parentTile: ProgramObject;

  constructor(parentTile: ProgramObject, name: string, caption?: string) {
    this.id = name;
    this.targetId = null;
    this.caption = caption ?? "";
    this.parentTile = parentTile;
  }

  sendConnection(targetTile: ProgramObject): boolean {
    const isAccepted = targetTile.receiveConnection(this.parentTile);
    if (isAccepted) {
      this.targetId = targetTile.id;
    }
    return isAccepted;
  }

}