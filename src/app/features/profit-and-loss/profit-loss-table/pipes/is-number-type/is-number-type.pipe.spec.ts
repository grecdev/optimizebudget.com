import { IsNumberTypePipe } from './is-number-type.pipe';

describe('IsNumberTypePipe', () => {
  it('create an instance', () => {
    const pipe = new IsNumberTypePipe();
    expect(pipe).toBeTruthy();
  });
});
