const errorHandler = (err, req, res, next) => {
    console.error(`[ERROR] ${err.stack || err.message}`);

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map((e) => e.message);
        return res.status(400).json({
            success: false,
            error: 'Validation Error',
            details: messages,
        });
    }

    // Mongoose duplicate key error
    if (err.code && err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        return res.status(409).json({
            success: false,
            error: `Duplicate value for field: ${field}`,
        });
    }

    //Mongoose CastError (invalid Id Format)
    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            error: `Invalid ${err.path}: ${err.value}`,
        });
    }

    //Default server error
    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || 'Internal Server Error',
    });
};

module.exports = errorHandler;