enum RequirementType {
  INVALID = 'INVALID',
  VALID = 'VALID',
}

interface RegexPatterns {
  specialCharacters: RegExp;
  numbers: RegExp;
  lowercase: RegExp;
  uppercase: RegExp;
  password: RegExp;
}

export type { RegexPatterns };
export { RequirementType };
