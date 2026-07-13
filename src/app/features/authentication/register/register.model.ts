enum InputTypes {
  DISPLAY_NAME = 'display_name',
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
