const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res, next)
        } catch (error) {
            // one this will be caught by express in built error handler, if we do not catch it manually
            next(error)
        }
    }
}

module.exports = asyncWrapper