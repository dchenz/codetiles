import { ProgramObject } from "./ProgramObject";


export class EntryPoint extends ProgramObject {

  constructor(title?: string) {
    super("entry", title ?? "");
    this.addConnector("next", "");
  }

  _testReceiveConnection(_: ProgramObject): boolean {
    // Nothing can connect to entry tile
    return false;
  }

  toObject(): Record<string, unknown> {
    const objRep = super.toObject();
    objRep["next"] = super.getOutboundConnector("next")?.targetId;
    return objRep;
  }

}