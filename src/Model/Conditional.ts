import { ProgramObject } from "./ProgramObject";
import { Serializable } from "./Serializable";

export class Conditional extends ProgramObject {

  ifBlock: ConditionalBlock;
  elseIfBlocks: ConditionalBlock[];
  elseBlock: ConditionalBlock;

  constructor() {
    super("conditional");
    this.ifBlock = new ConditionalBlock();
    this.elseIfBlocks = [];
    this.elseBlock = new ConditionalBlock();
    this.addConnector("IF");
    this.addConnector("ELSE");
  }

  toObject() {
    const objRep = super.toObject();
    objRep["if"] = this.ifBlock.toObject();
    objRep["else_ifs"] = this.elseIfBlocks.map(b => b.toObject());
    objRep["else"] = this.elseBlock.toObject();
    return objRep;
  }

}

class ConditionalBlock implements Serializable {

  condition: string;
  nestedScope: ProgramObject[];

  constructor() {
    this.condition = "";
    this.nestedScope = [];
  }

  toObject(): Record<string, unknown> {
    return {
      "condition": this.condition,
      "nested_scope": this.nestedScope
    };
  }

}