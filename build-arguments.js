const argv = require('yargs').argv;

module.exports = {
    isDebug: process.argv.some(val => val === '--debug'),
    isVrt: process.argv.some(val => val === '--vrt'),
    config: argv.config,
    buildDir: argv.buildDir,
    port: argv.port,
    host: argv.host,
};
