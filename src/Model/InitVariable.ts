import { ProgramObject } from "./ProgramObject";


export class InitVariable extends ProgramObject {

  name: string;
  value: string;

  constructor(title?: string) {
    super("variable_init", title ?? "");
    this.name = "";
    this.value = "";
    this.addConnector("next");
  }

  toObject(): Record<string, unknown> {
    const objRep = super.toObject();
    objRep["name"] = this.name;
    objRep["value"] = this.value;
    objRep["next"] = super.getOutboundConnector("next")?.targetId;
    return objRep;
  }

}