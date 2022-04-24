import { ProgramObject } from "../ProgramObject";
import { StringAttribute } from "../Attributes/StringAttribute";

export class FunctionDeclare extends ProgramObject {

  constructor(title?: string) {
    super("function_declare", title ?? "");
    this.addConnector("body", "BODY");
    this.setAttribute(new StringAttribute("name", {
      displayName: "Function name",
      required: true
    }));
  }

  toObject(): Record<string, unknown> {
    const objRep = super.toObject();
    objRep["body"] = super.getOutboundConnector("body")?.targetId;
    return objRep;
  }

}