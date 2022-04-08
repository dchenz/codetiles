import { ProgramObject } from "./ProgramObject";


export class EntryPoint extends ProgramObject {

  constructor() {
    super("entry");
    this.addConnector("");
  }

  receiveConnection(_: ProgramObject): boolean {
    // Nothing can connect to entry tile
    return false;
  }

}