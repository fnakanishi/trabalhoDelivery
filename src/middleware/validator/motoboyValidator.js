const schema = require('../schema/motoboySchema');

const cpfValidator = (cpf) => {
  const numerosCPF = cpf.replace(/\./g, '').replace(/-/g, '');
  const primeiro = parseInt(numerosCPF[0]);
  let somaDigitoA = 0;
  let somaDigitoB = 0;
  let dif = false;
  for (let i = 0; i < 9; i++) {
    const digito = parseInt(numerosCPF[i]);
    somaDigitoA += digito * (10 - i);
    somaDigitoB += digito * (11 - i);
    if (!dif && digito !== primeiro)
      dif = true;
  }
  somaDigitoB += 2 * parseInt(numerosCPF[9]);
  const digitoA = (somaDigitoA % 11) < 2 ? 0 : (11 - (somaDigitoA % 11));
  const digitoB = (somaDigitoB % 11) < 2 ? 0 : (11 - (somaDigitoB % 11));
  if (!dif && (primeiro !== digitoA || primeiro !== digitoB))
    dif = true;
  if (digitoA === parseInt(numerosCPF[9]) && digitoB === parseInt(numerosCPF[10]) && dif)
    return 'OK';
    return 'CPF inválido.';
}

const validate = (req, res, next) => {
  const path = req.route.path;
  console.log(path);
  const { cpf, senha } = req.body;
  if (path === '/login') {
    if (!cpf || !senha)
      return res.status(422).json({ error: 'Campos obrigatórios não preenchidos.' });
  }
  if (path === '/edit' || path === '/create') {
    const { id, nome, telefone } = req.body;
    if ((!id && path !== '/create') || !nome || !cpf || !senha || !telefone)
      return res.status(422).json({ error: 'Campos obrigatórios não preenchidos.' });
  }
  const { error } = schema.validate(req.body);
  if (error) return res.status(422).json({ error: error.details });
  const cpfValid = cpfValidator(cpf);
  if (cpfValid !== 'OK') return res.status(422).json({ error: cpfValid });
  next();
}

module.exports = validate;