import { setWidth } from '../../../components/section/section';

describe('Section Tests:', () => {
    it('expect width to return value from string', () => {
        const width = setWidth('100px');
        expect(width).toBe('100px');
    });

    it('expect width to return value from number', () => {
        const width = setWidth(100);
        expect(width).toBe('100px');
    });

    it('expect width to return value from number in string', () => {
        const width = setWidth('100');
        expect(width).not.toBe('100px');
    });
});
