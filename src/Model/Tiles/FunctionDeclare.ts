import { ProgramObject } from "../ProgramObject";

export class FunctionDeclare extends ProgramObject {

  constructor(title?: string) {
    super("function_declare", title ?? "");
    this.addConnector("body", "BODY");
    this.setAttribute("name", "");
  }

  toObject(): Record<string, unknown> {
    const objRep = super.toObject();
    objRep["body"] = super.getOutboundConnector("body")?.targetId;
    return objRep;
  }

}