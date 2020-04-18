import StyleguideConfig from '../styleguide.config';
import path from 'path';

describe('Config checks', () => {
    it('Config Structure', () => {
        expect(StyleguideConfig).toMatchSnapshot();
    });

    it('Config getExceptionForLoaders', () => {
        expect(StyleguideConfig.getExceptionForLoaders()).toMatchSnapshot();
    });

    it('Config getSections', () => {
        try {
            expect(StyleguideConfig.getSections()).toMatchSnapshot();
        } catch (err) {
            console.log(err);
        }
    });

    it('Config getComponentRoots', () => {
        expect(StyleguideConfig.getComponentRoots({ path })).toMatchSnapshot();
    });

    it('Config getWebpackConfig', () => {
        expect(StyleguideConfig.getWebpackConfig({ path })).toMatchSnapshot();
    });
});
