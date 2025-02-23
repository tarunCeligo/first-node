const Joi = require('joi');

const validateTask = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required().messages({
            'any.required': 'Title is required',
        }),
        description: Joi.string().optional(),
        status: Joi.string().valid('Pending', 'In Progress', 'Completed').optional(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = validateTask;
