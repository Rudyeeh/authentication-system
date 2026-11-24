
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
            message: error.details[0].message
        });
    }

    next();
};

const validateLogin = (req, res, next) => {
    const schema = Joi.object({
        identifier: Joi.string().trim().required(),
        password: Joi.string().min(4).max(15).required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
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
