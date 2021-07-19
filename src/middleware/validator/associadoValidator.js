const schema = require('../schema/associadoClienteSchema');
const cnpjValidator = require('./cnpjValidator');

const validate = (req, res, next) => {
  const path = req.route.path;
  const { cnpj, senha } = req.body;
  if (path === '/login') {
    if (!cnpj || !senha)
      return res.status(422).json({ error: 'Campos obrigatórios não preenchidos.' });
  }
  if (path === '/edit' || path === '/create') {
    const { id, nomeEmpresa } = req.body;
    if ((!id && path !== '/create') || !nomeEmpresa || !cnpj || !senha)
      return res.status(422).json({ error: 'Campos obrigatórios não preenchidos.' });
  }
  const { error } = schema.validate(req.body);
  if (error) return res.status(422).json({ error: error.details });
  const cnpjValid = cnpjValidator(cnpj);
  if (cnpjValid !== 'OK') return res.status(422).json({ error: cnpjValid });
  next();
}

module.exports = validate;