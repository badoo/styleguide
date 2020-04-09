import StyleguideCell from './styleguide-cell/styleguide-cell';
import StyleguideDeviceFrame from './styleguide-device-frame/styleguide-device-frame';
import StyleguideDeviceRange from './styleguide-device-range/styleguide-device-range';
import StyleguideGroup from './styleguide-group/styleguide-group';
import StyleguidePlaceholder from './styleguide-placeholder/styleguide-placeholder';
import getImageUrl from './styleguide-static/styleguide-static';

declare const visualHelpers: {
    StyleguideCell: typeof StyleguideCell;
    StyleguideDeviceFrame: typeof StyleguideDeviceFrame;
    StyleguideDeviceRange: typeof StyleguideDeviceRange;
    StyleguideGroup: typeof StyleguideGroup;
    StyleguidePlaceholder: typeof StyleguidePlaceholder;
    getImageUrl: typeof getImageUrl;
};

export default visualHelpers;
