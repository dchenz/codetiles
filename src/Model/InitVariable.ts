import { ProgramObject } from "./ProgramObject";


export class InitVariable extends ProgramObject {

  name: string;
  value: string;

  constructor() {
    super("variable_init");
    this.name = "";
    this.value = "";
  }

  toObject(): Record<string, unknown> {
    const objRep = super.toObject();
    objRep["name"] = this.name;
    objRep["value"] = this.value;
    return objRep;
  }

}