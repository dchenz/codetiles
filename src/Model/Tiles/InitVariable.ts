import { StringAttribute } from "../Attributes/StringAttribute";
import { ProgramObject } from "../ProgramObject";


export class InitVariable extends ProgramObject {

  static instance = 0;

  constructor(title?: string) {
    super("variable_init", title ?? "");
    this.addConnector("next");
    this.setAttribute(new StringAttribute("name", {
      displayName: "Variable name",
      initialValue: `v${InitVariable.instance}`,
      validators: [
        {
          isValid: isValidVariableName,
          errorMessage: "Invalid variable name"
        }
      ]
    }));
    this.setAttribute(new StringAttribute("value", { displayName: "Value" }));
    InitVariable.instance++;
  }

  toObject(): Record<string, unknown> {
    const objRep = super.toObject();
    objRep["next"] = super.getOutboundConnector("next")?.targetId;
    return objRep;
  }

}

function isValidVariableName(name: string): boolean {
  return /^[A-Za-z_]\w*$/.test(name);
}