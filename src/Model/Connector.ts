import { Serializable } from "./Serializable";

export class Connector implements Serializable {

  targetId: string | null;
  caption: string;

  constructor(targetId: string | null, caption: string) {
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