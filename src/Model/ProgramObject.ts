import { v4 as uuid } from "uuid";
import { Serializable } from "./Serializable";

export class ProgramObject implements Serializable {

  id: string;
  title: string;
  inboundConnectors: string[];
  outboundConnectors: string[];
  returnType: string;

  constructor(title: string) {
    this.id = uuid();
    this.title = title;
    this.inboundConnectors = [];
    this.outboundConnectors = [];
    this.returnType = "null";
  }

  toObject() {
    return { ...this };
  }

}