import { Connector } from "./Connector";
import { ProgramObject } from "./ProgramObject";

export class Loop extends ProgramObject {

  condition: string;
  nestedScope: ProgramObject[];

  constructor() {
    super("loop");
    this.condition = "";
    this.nestedScope = [];
    this.outboundConnectors.push(new Connector(null, "REPEAT"));
    this.outboundConnectors.push(new Connector(null, "LEAVE"));
  }

  toObject(): Record<string, unknown> {
    const objRep = super.toObject();
    objRep["condition"] = this.condition;
    objRep["nested_scope"] = this.nestedScope.map(s => s.toObject());
    return objRep;
  }

}