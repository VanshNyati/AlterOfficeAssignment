// backend/middlewares/taskValidation.js
const Joi = require('joi');

const taskSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().max(300),
    category: Joi.string().valid('Work', 'Personal').required(),
    dueDate: Joi.date().required(),
    userId: Joi.string().required(),
});

const validateTask = (req, res, next) => {
    const { error } = taskSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
};

module.exports = validateTask;
