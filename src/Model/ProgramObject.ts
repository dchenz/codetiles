import { v4 as uuid } from "uuid";
import { Connector } from "./Connector";
import { Serializable } from "./Serializable";

export abstract class ProgramObject implements Serializable {

  id: string;
  type: string;
  title: string;
  inboundConnectors: string[];
  outboundConnectors: Connector[];
  returnType: string;

  constructor(type: string) {
    this.id = uuid();
    this.type = type;
    this.title = "";
    this.inboundConnectors = [];
    this.outboundConnectors = [];
    this.returnType = "null";
  }

  addConnector(caption: string) {
    this.outboundConnectors.push(new Connector(this, caption));
  }

  // Assumption: A tile can only join one connector to a particular tile
  receiveConnection(fromTile: ProgramObject): boolean {
    if (this.inboundConnectors.includes(fromTile.id)) {
      return false;
    }
    this.inboundConnectors.push(fromTile.id);
    return true;
  }

  toObject(): Record<string, unknown> {
    return {
      "id": this.id,
      "type": this.type,
      "title": this.title,
      "inbound_connectors": this.inboundConnectors,
      "outbound_connectors": this.outboundConnectors.map(c => c.toObject()),
      "return_type": this.returnType
    };
  }

}