const loggerMiddleware = (req, res, next) => {
    const originalJson = res.json;
    res.json = function(data) {
        console.log(`Endpoint: ${req.method} ${req.originalUrl}`);
        console.log('Response:', data);
        originalJson.call(this, data);
    };
    
    next();
};

module.exports = loggerMiddleware;
