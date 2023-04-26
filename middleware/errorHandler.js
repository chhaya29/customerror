const { CustomAPIError } = require('../errors/customError')

const errorHandler = (err, req, res, next) => {
    // one first method to send error with simple next(error)
    //return res.status(500).json({ msg: 'Something went wrong, try again' })

    // two second method with next(new Error, status)
    // return res.status(err.status).json({ msg: err.message})

    //third method with CustomAPIError
    console.log('bool', err instanceof CustomAPIError)
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
    return res.status(500).json({ msg: 'Something went wrong, please try again' })
}

module.exports = errorHandler