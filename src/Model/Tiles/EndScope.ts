import { ProgramObject } from "../ProgramObject";


export class EndScope extends ProgramObject {

  constructor(title?: string) {
    super("end_scope", title ?? "");
    this.addConnector("next");
  }

  toObject(): Record<string, unknown> {
    const objRep = super.toObject();
    objRep["next"] = super.getOutboundConnector("next")?.targetId;
    return objRep;
  }

}