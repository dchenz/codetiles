import { Attribute, AttributeOptions } from "./Attribute";

export class IntegerAttribute extends Attribute {

  constructor(id: string, options?: AttributeOptions) {
    super("int", id, options);
  }

}