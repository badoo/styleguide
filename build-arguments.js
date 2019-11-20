module.exports = {
    isDebug: process.argv.some(val => val === '--debug'),
    isCi: process.argv.some(val => val === '--ci'),
};
