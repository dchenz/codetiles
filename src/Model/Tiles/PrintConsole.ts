import { ProgramObject } from "../ProgramObject";
import { StringAttribute } from "../Attributes/StringAttribute";


export class PrintConsole extends ProgramObject {

  constructor(title?: string) {
    super("print_console", title ?? "");
    this.addConnector("next");
    this.setAttribute(new StringAttribute("value", { displayName: "Value" }));
  }

  toObject(): Record<string, unknown> {
    const objRep = super.toObject();
    objRep["next"] = super.getOutboundConnector("next")?.targetId;
    return objRep;
  }

}
