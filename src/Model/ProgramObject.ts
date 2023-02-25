import { v4 as uuid } from "uuid";
import { Attribute } from "./Attributes/Attribute";
import { Connector } from "./Connector";
import { Serializable } from "./Serializable";

export abstract class ProgramObject implements Serializable {

  id: string;
  type: string;
  title: string;
  inboundConnectors: string[];
  outboundConnectors: Connector[];
  attributes: Record<string, Attribute>;

  constructor(type: string, title: string) {
    this.id = uuid();
    this.type = type;
    this.title = title;
    this.inboundConnectors = [];
    this.outboundConnectors = [];
    this.attributes = {};
  }

  getAttributes() {
    return Object.values(this.attributes);
  }

  setAttribute(attr: Attribute) {
    this.attributes[attr.id] = attr;
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
      throw new Error("Tile id not found. Method _disconnect should be called from connector.");
    }
    this.inboundConnectors.splice(idx, 1);
  }

  getOutboundConnector(name: string): Connector | null {
    return this.outboundConnectors.find(x => x.id == name) ?? null;
  }

  toObject(): Record<string, unknown> {
    const objRep: Record<string, unknown> = {
      "id": this.id,
      "type": this.type,
      "title": this.title
    };
    if (this.getAttributes().length > 0) {
      const attrs = Object.fromEntries(this.getAttributes().map((a) => [a.id, a.value]));
      objRep["attributes"] = attrs;
    }
    return objRep;
  }

}