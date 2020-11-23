export const checkMobileScreen = target => {
    const userAgent = typeof target.navigator === 'undefined' ? '' : navigator.userAgent;
    const isTabletViewport = target.innerWidth < deviceSizes.tablet;
    const isMobileDevice = Boolean(
        userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i)
    );

    return isTabletViewport || isMobileDevice;
};

export const deviceSizes = {
    phone: 376,
    tablet: 768,
    desktopSm: 992,
    desktopMd: 1280,
    desktopHd: 1440,
    desktopLg: 2560,
};
