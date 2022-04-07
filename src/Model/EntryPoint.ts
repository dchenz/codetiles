import { Connector } from "./Connector";
import { ProgramObject } from "./ProgramObject";


export class EntryPoint extends ProgramObject {

  constructor() {
    super("entry");
    this.outboundConnectors.push(new Connector(null, "Next"));
    this.outboundConnectors.push(new Connector(null, "Next"));
    this.outboundConnectors.push(new Connector(null, "Next"));
    this.outboundConnectors.push(new Connector(null, "Next"));
    this.outboundConnectors.push(new Connector(null, "Next"));
    this.outboundConnectors.push(new Connector(null, "Next"));
  }

}