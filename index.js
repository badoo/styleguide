const StyleguideCell = require('./src/visual-helpers/styleguide-cell/styleguide-cell').default;
const StyleguideDeviceFrame = require('./src/visual-helpers/styleguide-device-frame/styleguide-device-frame')
    .default;
const StyleguideDeviceRange = require('./src/visual-helpers/styleguide-device-range/styleguide-device-range')
    .default;
const StyleguideGroup = require('./src/visual-helpers/styleguide-group/styleguide-group').default;
const StyleguidePlaceholder = require('./src/visual-helpers/styleguide-placeholder/styleguide-placeholder')
    .default;
const getImageUrl = require('./src/visual-helpers/styleguide-static').default;

module.exports = {
    StyleguideCell,
    StyleguideDeviceFrame,
    StyleguideDeviceRange,
    StyleguideGroup,
    StyleguidePlaceholder,
    getImageUrl,
};
