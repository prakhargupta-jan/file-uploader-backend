const fs = require('fs/promises');

const globabErrorHandler = (err, req, res, next) => {
    console.error(err);
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went very wrong';
    if (err.name == 'ValidationError' || err.name == 'CastError' || err.name == 'ValidatorError') {
        fs.unlink(req.file.path)
        const errors = Object.entries(err.errors).map(([key, value]) => {
            return `In line number ${parseInt(key.split('.')[1]) + 1} in field ${key.split('.')[2]} : ${value.message}`
        })
        return res.status(400).json({
            status: 'failure',
            errors
        })
    }
    res.status(errStatus).json({
        status: errStatus.toString().startsWith("5") ? 'error' : 'failure',
        errMsg
    })
}

module.exports = globabErrorHandler