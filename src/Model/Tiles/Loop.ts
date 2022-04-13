import { ProgramObject } from "../ProgramObject";

export class Loop extends ProgramObject {

  condition: string;

  constructor(title?: string) {
    super("loop", title ?? "");
    this.condition = "";
    this.addConnector("repeat", "REPEAT");
    this.addConnector("leave", "LEAVE");
  }

  toObject(): Record<string, unknown> {
    const objRep = super.toObject();
    objRep["while"] = {
      "condition": this.condition,
      "repeat": super.getOutboundConnector("repeat")?.targetId,
      "leave": super.getOutboundConnector("leave")?.targetId
    };
    return objRep;
  }

}