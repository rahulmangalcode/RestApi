const errorHandler = (err, req, res, next) => {
    console.error(`[ERROR] ${err.stack || err.message}`);
};

module.exports = errorHandler;