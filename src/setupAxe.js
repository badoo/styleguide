const { configureAxe } = require('jest-axe');

const axe = configureAxe({
    impactLevels: ['minor'],
});

module.exports = axe;
