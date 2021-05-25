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
            const getComponentsFromSections = (sections) => {
                const sectionList = sections.toString();
                const componentPaths = sectionList
                    .match(/require\((.+)\)/gm)
                    .map((path) => path.replace(/require\((.+)\)/g, '$1').replace(/'/g, ''));

                return Array.from(new Set(componentPaths));
            };

            const resolveComponentPathsFromComponentRoots = (components, getComponentRoots) => {
                const listOfResolvedComponents = getComponentRoots({ path }).map((root) =>
                    components.map((component) => path.parse(path.resolve(root, component)).name)
                );

                return listOfResolvedComponents.reduce(
                    (flatComponentsList, section) => flatComponentsList.concat(section),
                    []
                );
            };
            const components = StyleguideConfig.getSections
                ? getComponentsFromSections(StyleguideConfig.getSections)
                : undefined;
            const includePaths =
                components && StyleguideConfig.getComponentRoots
                    ? resolveComponentPathsFromComponentRoots(
                          components,
                          StyleguideConfig.getComponentRoots
                      )
                    : undefined;

            expect(includePaths).toMatchSnapshot();
        } catch (err) {
            console.log(err);
        }
    });

    it('Config getComponentRoots', () => {
        expect(
            StyleguideConfig.getComponentRoots({ path }).map((item) => path.parse(item).name)
        ).toMatchSnapshot();
    });

    it('Config getWebpackConfig', () => {
        expect(
            StyleguideConfig.getWebpackConfig({ path }).resolve.modules.map(
                (item) => path.parse(item).name
            )
        ).toMatchSnapshot();
    });
});
