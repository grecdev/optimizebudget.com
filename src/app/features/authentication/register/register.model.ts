enum RequirementType {
  INVALID = 'INVALID',
  VALID = 'VALID',
}

enum InputTypes {
  FULL_NAME = 'FULL_NAME',
  EMAIL = 'EMAIL',
  PASSWORD = 'PASSWORD',
  CONFIRM_PASSWORD = 'CONFIRM_PASSWORD',
}

interface RegexPatterns {
  specialCharacters: RegExp;
  numbers: RegExp;
  lowercase: RegExp;
  uppercase: RegExp;
  password: RegExp;
  lengthLimit: RegExp;
}

export type { RegexPatterns };
export { RequirementType, InputTypes };
