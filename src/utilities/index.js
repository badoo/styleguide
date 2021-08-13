export const checkMobileScreen = (target) => {
    const isTabletViewport = target.innerWidth < deviceSizes.tablet;
    const isMobileDevice = Boolean(
        target.navigator.userAgent.match(
            /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
        )
    );

    return isTabletViewport || isMobileDevice;
};

/**
 * @type {Object<string, number>}
 */
export const deviceSizes = {
    phone: 376,
    phoneLg: 426,
    tablet: 768,
    desktopSm: 992,
    desktopMd: 1280,
    desktopHd: 1440,
    desktopLg: 2560,
};

/**
 * curently we support:
 * classes,
 * React.Components,
 * React.PureComponents
 */
function isComponentHOC(component) {
    return (
        component.__highOrderComponentInnerComponent &&
        component.__highOrderComponentInnerComponent.name !== component.default.name &&
        component.default.name === '_class'
    );
}

function setComponentMeta(component) {
    let meta =
        component.default && component.default.__meta ? component.default.__meta : component.__meta;

    /**
     * add support for material-ui
     */
    if (component.default && component.default.Naked && component.default.Naked.__meta) {
        meta = component.default.Naked.__meta;
    }

    if (isComponentHOC(component)) {
        meta = component.__highOrderComponentInnerComponent.__meta;
    }

    return meta;
}

function getTestConfiguration(testModules) {
    return testModules
        .reduce((list, module) => {
            const variations = Object.keys(module)
                // Filter out system stuff (__meta, __dependencyResolver)
                // @todo make explicit
                .filter((exportKey) => exportKey.indexOf('__') === -1)
                .map((exportKey) => {
                    let Test = {
                        name: module[exportKey].name,
                        testCase: module[exportKey],
                    };

                    if (!Test.name) {
                        Test.name = exportKey;
                    }

                    return Test;
                });
            return list.concat(variations);
        }, [])
        .map((Test) => ({
            name: Test.name,
            Component: Test.testCase,
        }));
    return testConfiguration;
}

function getUniqueDependencyResolverKeys(keys) {
    /**
     * webpack 5 bug - https://github.com/webpack/webpack/issues/12087
     * report to maintainers
     */
    const result = keys.filter((key) => key.startsWith('./'));

    return result;
}

function processConfigComponent({ component, sectionName, isSpecificationPath }) {
    const meta = setComponentMeta(component);
    const dependencyResolver = component.__dependencyResolver;

    if (!dependencyResolver || !meta) {
        return null;
    }

    const isSpecPath = isSpecificationPath || defaultIsSpecificationPath;
    const testsPaths = getUniqueDependencyResolverKeys(dependencyResolver.keys()).filter((key) =>
        isSpecPath(meta, key)
    );
    const testsModules = testsPaths.map(dependencyResolver);
    const tests = getTestConfiguration(testsModules);

    return {
        url: encodeURIComponent(`${sectionName}-${meta.name}`),
        name: meta.name,
        description: meta.description,
        propTypes: meta.propTypes,
        tests,
    };
}

function processConfigSection({ section: { name, components = [] }, isSpecificationPath }) {
    return {
        name,
        components: components
            .map((component) =>
                processConfigComponent({ component, sectionName: name, isSpecificationPath })
            )
            .filter(Boolean),
    };
}

export function processConfigSections({ configSections, isSpecificationPath }) {
    return configSections.map((section) => processConfigSection({ section, isSpecificationPath }));
}

export function defaultIsSpecificationPath(componentMeta, path) {
    return path.indexOf(`${componentMeta.fileNameWithoutPrefix}.spec`) !== -1;
}

export function processSearchQuery(searchQuery, sections = []) {
    const searchResultSections = [];

    if (searchQuery) {
        sections.map((section) => {
            const components = section.components.filter((component) => {
                const searchValue = component.name.toLowerCase();
                return searchValue.indexOf(searchQuery) !== -1;
            });

            if (components.length) {
                const { ...filteredSectionFields } = section;

                searchResultSections.push({
                    ...filteredSectionFields,
                    isOpened: true,
                    components,
                });
            }
        });
    }

    return searchResultSections;
}
