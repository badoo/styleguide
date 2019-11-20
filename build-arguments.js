const argv = require('yargs').argv;

module.exports = {
    isDebug: process.argv.some(val => val === '--debug'),
    isCi: process.argv.some(val => val === '--ci'),
    config: argv.config,
    buildDir: argv.buildDir,
    port: argv.port,
    host: argv.host,
};
