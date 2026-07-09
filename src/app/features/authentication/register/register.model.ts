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
  lengthLimit: RegExp;
  fullName: RegExp;
  password: RegExp;
}

export type { RegexPatterns };
export { InputTypes };
