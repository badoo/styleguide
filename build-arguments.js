module.exports = {
    isDebug: process.argv.some(val => val === '--debug'),
};
