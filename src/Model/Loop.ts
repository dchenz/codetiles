import { ProgramObject } from "./ProgramObject";

export class Loop extends ProgramObject {

  condition: string;
  nestedScope: ProgramObject[];

  constructor(title: string, condition: string) {
    super(title);
    this.condition = condition;
    this.nestedScope = [];
  }

  toObject() {
    const objRep = super.toObject();
    objRep.condition = this.condition;
    objRep.nestedScope = [];
    for (const nestedObj of this.nestedScope) {
      objRep.nestedScope.push(nestedObj.toObject());
    }
    return objRep;
  }

}