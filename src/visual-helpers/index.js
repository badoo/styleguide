const StyleguideCell = require('./styleguide-cell/styleguide-cell').default;
const StyleguideFrame = require('./styleguide-iframe/styleguide-iframe').default;
const StyleguideDeviceFrame = require('./styleguide-device-frame/styleguide-device-frame').default;
const StyleguideDeviceRange = require('./styleguide-device-range/styleguide-device-range').default;
const StyleguideGroup = require('./styleguide-group/styleguide-group').default;
const StyleguidePlaceholder = require('./styleguide-placeholder/styleguide-placeholder').default;
const getImageUrl = require('./styleguide-static/styleguide-static');

const visualHelpers = {
    StyleguideCell,
    StyleguideFrame,
    StyleguideDeviceFrame,
    StyleguideDeviceRange,
    StyleguideGroup,
    StyleguidePlaceholder,
    getImageUrl,
};

module.exports = visualHelpers;
