import { Conditional } from "./Conditional";
import { Loop } from "./Loop";
import { ProgramObject } from "./ProgramObject";

export function nameToObject(name: string): ProgramObject {
  switch (name) {
  case "conditional":
    return new Conditional();
  case "loop":
    return new Loop();
  }
  console.error("Unknown object name: " + name);
  throw 1;
}