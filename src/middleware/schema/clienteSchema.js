const Joi = require('joi');

const schema = Joi.object().keys({
  id: Joi.number().integer(),
  nomeEmpresa: Joi.string().required(),
  cnpj: Joi.string().pattern(/[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}/).required(),
  endereco: Joi.string().max(150).required()
});

module.exports = schema;
