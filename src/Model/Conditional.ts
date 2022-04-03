import { ProgramObject } from "./ProgramObject";

export class Conditional extends ProgramObject {

  condition: string;
  elseIfs: Conditional[];
  elseThen: Conditional;
  nestedScope: ProgramObject[];

  constructor(title: string, condition: string, nestedScope: ProgramObject[]) {
    super(title);
    this.condition = condition;
    this.nestedScope = nestedScope;
    this.elseIfs = [];
    this.elseThen = new Conditional("", "true", []);
  }

  toObject() {
    const objRep = super.toObject();
    objRep.condition = this.condition;
    objRep.elseIfs = [];
    for (const cond of this.elseIfs) {
      objRep.elseIfs.push(cond.toObject());
    }
    objRep.elseThen = this.elseThen.toObject();
    objRep.nestedScope = [];
    for (const nestedObj of this.nestedScope) {
      objRep.nestedScope.push(nestedObj.toObject());
    }
    return objRep;
  }

}