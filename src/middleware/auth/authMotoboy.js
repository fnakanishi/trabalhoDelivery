const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).json({ msg: 'Token indefinido.' });
  jwt.verify(token, process.env.JWT_MOTOBOY_SECRET, (err, decoded) => {
    if (err)
      return res.status(401).json({ msg: 'Falha na autenticação do Token.' });
      console.log(decoded.id);
    req.motoboyId = decoded.id;
    next();
  });
}

module.exports = verifyJWT;