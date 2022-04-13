import { ProgramObject } from "../ProgramObject";

export class FunctionDeclare extends ProgramObject {

  constructor(title?: string) {
    super("function_declare", title ?? "");
    this.addConnector("inside", "INSIDE");
    this.addConnector("outside", "OUTSIDE");
    this.setAttribute("name", "");
  }

  toObject(): Record<string, unknown> {
    const objRep = super.toObject();
    objRep["inside"] = super.getOutboundConnector("inside")?.targetId;
    objRep["outside"] = super.getOutboundConnector("outside")?.targetId;
    return objRep;
  }

}