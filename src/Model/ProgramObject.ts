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
  _receiveConnection(fromTile: ProgramObject): boolean {
    const connectable = this._testReceiveConnection(fromTile);
    if (connectable) {
      this.inboundConnectors.push(fromTile.id);
    }
    return connectable;
  }

  // This method should be overriden in child classes
  _testReceiveConnection(fromTile: ProgramObject): boolean {
    if (this.inboundConnectors.includes(fromTile.id)) {
      return false;
    }
    return true;
  }

  _disconnect(fromTile: ProgramObject) {
    const idx = this.inboundConnectors.indexOf(fromTile.id);
    if (idx < 0) {
      console.error("Tile id not found. Method _disconnect should be called from connector.");
      throw 1;
    }
    this.inboundConnectors.splice(idx, 1);
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