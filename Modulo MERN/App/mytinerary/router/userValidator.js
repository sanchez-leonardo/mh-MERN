const { body, validationResult } = require('express-validator')
const userValidationRules = () => {
    return [
        //userName > 6 chars
        body('userName').isLength({ min: 6 }),
        // userEmail
        body('userEmail').isEmail(),
        // userPassword > 6 chars
        body('userPassword').isLength({ min: 6 })
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {
    userValidationRules,
    validate,
}