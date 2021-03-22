export const checkMobileScreen = target => {
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
