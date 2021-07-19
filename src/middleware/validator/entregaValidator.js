const schema = require('../schema/entregaSchema');

const validate = (req, res, next) => {
  const path = req.route.path;
  const { descricao, clienteId, motoboyId } = req.body;
  if (path.endsWith('/create')) {
    if (!descricao || !clienteId || !motoboyId)
      return res.status(422).json({ error: 'Campos obrigatórios não preenchidos.' });
  }
  if (path.endsWith('/edit')) {
    const { id, status, valor } = req.body;
    if (!id)
      return res.status(422).json({ error: 'Campos obrigatórios não preenchidos.' });
  }
  const { error } = schema.validate(req.body);
  if (error) return res.status(422).json({ error: error.details });
  next();
}

module.exports = validate;