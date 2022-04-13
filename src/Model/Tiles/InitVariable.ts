import { ProgramObject } from "../ProgramObject";


export class InitVariable extends ProgramObject {

  constructor(title?: string) {
    super("variable_init", title ?? "");
    this.addConnector("next");
    this.setAttribute("name", "");
    this.setAttribute("value", "");
  }

  toObject(): Record<string, unknown> {
    const objRep = super.toObject();
    objRep["next"] = super.getOutboundConnector("next")?.targetId;
    return objRep;
  }

}