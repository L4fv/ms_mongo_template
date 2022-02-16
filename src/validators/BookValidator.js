const Joi = require("joi");

const validatorBookPost = Joi.object({
  readings: Joi.array().required()
});

module.exports = {
  validatorBookPost
};
