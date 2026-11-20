
const Joi = require('joi');

const validateSignup = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().trim().min(3).max(15).required(),
        email: Joi.string().trim().email().required(),
        password: Joi.string().min(4).max(15).required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            error: error.details[0].message
        });
    }

    next();
};

const validateLogin = (req, res, next) => {
    const schema = Joi.object({
        login: Joi.string().trim().required().custom((value, helpers) => {
            const isEmail = Joi.string().email().validate(value).error === undefined;
            const isUsername = Joi.string().min(3).max(15).validate(value).error === undefined;

            if (!isEmail && !isUsername) {
                return helpers.error('any.invalid');
            }

            return value;
        }),
        password: Joi.string().min(4).max(15).required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            error: error.details[0].message
        });
    }

    next();
};

const validateLogout = (req, res, next) => {
    next();
};

module.exports = {
    validateSignup,
    validateLogin,
    validateLogout
};
