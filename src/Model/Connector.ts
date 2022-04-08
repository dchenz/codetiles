import { v4 as uuid } from "uuid";
import { ProgramObject } from "./ProgramObject";
import { Serializable } from "./Serializable";

export class Connector implements Serializable {

  id: string;
  targetId: string | null;
  caption: string;
  parentTile: ProgramObject;

  constructor(parentTile: ProgramObject, caption: string) {
    this.id = uuid();
    this.targetId = null;
    this.caption = caption;
    this.parentTile = parentTile;
  }

  sendConnection(targetTile: ProgramObject): boolean {
    const isAccepted = targetTile.receiveConnection(this.parentTile);
    if (isAccepted) {
      this.targetId = targetTile.id;
    }
    return isAccepted;
  }

  toObject(): Record<string, unknown> {
    return {
      "id": this.id,
      "target_id": this.targetId,
      "caption": this.caption
    };
  }

}