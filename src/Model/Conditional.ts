import { ProgramObject } from "./ProgramObject";

export class Conditional extends ProgramObject {

  ifCondition: string;
  elseCondition: string;

  constructor(title?: string) {
    super("conditional", title ?? "");
    this.ifCondition = "";
    this.elseCondition = "";
    this.addConnector("if", "IF");
    this.addConnector("else", "ELSE");
  }

  toObject() {
    const objRep = super.toObject();
    objRep["if"] = {
      "condition": this.ifCondition,
      "then": super.getOutboundConnector("if")?.targetId
    };
    objRep["else"] = {
      "condition": this.elseCondition,
      "then": super.getOutboundConnector("else")?.targetId
    };
    return objRep;
  }

}