import { ProgramObject } from "./ProgramObject";


export class ExitPoint extends ProgramObject {

  constructor(title?: string) {
    super("exit", title ?? "");
  }

}