const Joi = require('joi');

const schema = Joi.object().keys({
  id: Joi.number().integer(),
  descricao: Joi.string(),
  clienteId: Joi.number().integer(),
  motoboyId: Joi.number().integer(),
  status: Joi.string(),
  valor: Joi.number().float()
});

module.exports = schema;