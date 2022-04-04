import { Serializable } from "./Serializable";

export class Connector implements Serializable {

  targetId: string;
  caption: string;

  constructor(targetId: string, caption: string) {
    this.targetId = targetId;
    this.caption = caption;
  }

  toObject(): Record<string, unknown> {
    return {
      "target_id": this.targetId,
      "caption": this.caption
    };
  }

}