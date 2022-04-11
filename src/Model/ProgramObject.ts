import { v4 as uuid } from "uuid";
import { Connector } from "./Connector";
import { Serializable } from "./Serializable";

export abstract class ProgramObject implements Serializable {

  id: string;
  type: string;
  title: string;
  inboundConnectors: string[];
  outboundConnectors: Connector[];

  constructor(type: string, title: string) {
    this.id = uuid();
    this.type = type;
    this.title = title;
    this.inboundConnectors = [];
    this.outboundConnectors = [];
  }

  addConnector(name: string, caption?: string) {
    this.outboundConnectors.push(new Connector(this, name, caption ?? ""));
  }

  // Assumption: A tile can only join one connector to a particular tile
  receiveConnection(fromTile: ProgramObject): boolean {
    if (this.inboundConnectors.includes(fromTile.id)) {
      return false;
    }
    this.inboundConnectors.push(fromTile.id);
    return true;
  }

  getOutboundConnector(name: string): Connector | null {
    return this.outboundConnectors.find(x => x.id == name) ?? null;
  }

  toObject(): Record<string, unknown> {
    return {
      "id": this.id,
      "type": this.type,
      "title": this.title
    };
  }

}