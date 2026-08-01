import { PasswordRequirementValidatorPipe } from './password-requirement-validator.pipe';

describe('PasswordRequirementValidatorPipe', () => {
  it('create an instance', () => {
    const pipe = new PasswordRequirementValidatorPipe();
    expect(pipe).toBeTruthy();
  });
});
