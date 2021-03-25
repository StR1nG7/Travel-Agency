/* eslint-disable no-undef */
import { flex } from './styled-components';

describe('utils tests', () => {
  it('flex(): should return correct string', () => {
    const expectedString = `display: flex;
			flex-flow: row nowrap;
			justify-content: flex-start;
			align-items: center;`;
    const newString = flex({});
    expect(newString).toBe(expectedString);

    const expectedString2 = `display: flex;
			flex-flow: column nowrap;
			justify-content: flex-start;
			align-items: flex-start;`;
    const newString2 = flex({ direction: 'column', align: 'flex-start' });
    expect(newString2).toBe(expectedString2);
  });
});
