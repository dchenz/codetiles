import { ProgramObject } from "./ProgramObject";

export class Loop extends ProgramObject {

  condition: string;
  nestedScope: ProgramObject[];

  constructor(title: string) {
    super("loop", title);
    this.condition = "";
    this.nestedScope = [];
  }

  toObject(): Record<string, unknown> {
    const objRep = super.toObject();
    objRep["condition"] = this.condition;
    objRep["nested_scope"] = this.nestedScope.map(s => s.toObject());
    return objRep;
  }

}