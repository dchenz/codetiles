import { ProgramObject } from "../ProgramObject";


export class StartPoint extends ProgramObject {

  constructor(title?: string) {
    super("start", title ?? "");
    this.addConnector("next", "");
  }

  _testReceiveConnection(_: ProgramObject): boolean {
    // Nothing can connect to start tile
    return false;
  }

  toObject(): Record<string, unknown> {
    const objRep = super.toObject();
    objRep["next"] = super.getOutboundConnector("next")?.targetId;
    return objRep;
  }

}