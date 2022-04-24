import { Attribute, AttributeOptions } from "./Attribute";

export class StringAttribute extends Attribute {

  constructor(id: string, options?: AttributeOptions) {
    super("str", id, options);
  }

}