

export abstract class Attribute {

  type: string;
  id: string;
  displayName: string;
  value: string;
  required: boolean;
  validators: AttributeValidator[];

  constructor(type: string, id: string, options?: AttributeOptions) {
    this.type = type;
    this.id = id;
    this.displayName = options?.displayName ?? id;
    this.value = options?.initialValue ?? "";
    this.required = options?.required ?? true;
    this.validators = options?.validators ?? [];
  }

  validate(updatedValue: string): string | null {
    for (const validator of this.validators) {
      if (!validator.isValid(updatedValue)) {
        return validator.errorMessage ?? "Invalid value";
      }
    }
    return null;
  }

}

export type AttributeOptions = {
  displayName?: string,
  initialValue?: string,
  required?: boolean,
  validators?: AttributeValidator[]
}

export type AttributeValidator = {
  isValid: (_: string) => boolean,
  errorMessage?: string
}