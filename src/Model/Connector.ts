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
    const isAccepted = targetTile._receiveConnection(this.parentTile);
    if (isAccepted) {
      this.targetId = targetTile.id;
    }
    return isAccepted;
  }

  testSendConnection(targetTile: ProgramObject): boolean {
    return targetTile._testReceiveConnection(targetTile);
  }

  disconnect(targetTile: ProgramObject) {
    if (this.targetId == null) {
      return;
    }
    if (targetTile.id != this.targetId) {
      throw new Error("Id doesn't match. Tile isn't connected to this connector.");
    }
    targetTile._disconnect(this.parentTile);
    this.targetId = null;
  }

}