const Joi = require('joi');

const schema = Joi.object().keys({
  id: Joi.number().integer(),
  nome: Joi.string().required(),
  cpf: Joi.string().pattern(/[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}/).required(),
  senha: Joi.string().pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@$!%*#?&]).{8,}$/).min(8).required(),
  telefone: Joi.string().max(150).required()
});

module.exports = schema;
