const argv = require('yargs').argv;

module.exports = {
    isDebug: process.argv.some(val => val === '--debug'),
    noPropsInTsxComponents: process.argv.some(val => val === '--no-props-for-tsx-components'),
    config: argv.config,
    buildDir: argv.buildDir,
    port: argv.port,
    host: argv.host,
};
