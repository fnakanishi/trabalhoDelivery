const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).json({ msg: 'Token indefinido.' });
  jwt.verify(token, process.env.JWT_ASSOCIADO_SECRET, (err, decoded) => {
    if (err)
      return res.status(401).json({ msg: 'Falha na autenticação do Token.' });
    req.associadoId = decoded.id;
    next();
  });
}

module.exports = verifyJWT;