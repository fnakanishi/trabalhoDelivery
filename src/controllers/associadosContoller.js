const Associado = require('../models/Associado');
const Sequelize = require('sequelize');

const passwordValidation = (password) => {
  if (password.lenght < 8)
    return 'Senha deve conter no mínimo 8 caracteres.';
  else if (!password.match(/[a-zA-Z]/g))
    return 'Senha deve conter no mínimo uma letra.';
  else if (!password.match(/[0-9]+/))
    return 'Senha deve conter no mínimo uma letra.';
  else
    return 'OK';
}

const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 82800,
  });
  console.log(token);
  return token;
}

module.exports = {
  async listAllAssociados(req, res) {
    const associados = await Associado.findAll({
      order: [['id', 'ASC']],
    }).catch((error) => {
      console.error(error);
      res.status(500).json({ msg: 'Falha na conexão.' });
    });

    if (associados)
      if (associados == '')
        res.status(404).json({ msg: 'Não foi possível encontrar associados.' });
      else res.status(200).json({ associados });
    else res.status(404).json({ msg: 'Não foi possível encontrar associados.' });
  },

  async searchByCNPJ(req, res) {
    const cnpj = req.params.cnpj;
    const associado = await Associado.findOne({
      where: { cnpj }
    }).catch((error) => {
      res.status(500).json({ msg: 'Falha na conexão.' });
    });

    if (associado)
      if (associado == '')
        res.status(404).json({ msg: 'Não foi possível encontrar o associado.' });
      else res.status(200).json({ associado });
    else res.status(404).json({ msg: 'Não foi possível encontrar o associado.' });
  },

  async searchById(req, res) {
    const id = req.params.id;
    const associado = await Associado.findOne({
      where: { id }
    }).catch((error) => {
      res.status(500).json({ msg: 'Falha na conexão.' });
    });

    if (associado)
      if (associado == '')
        res.status(404).json({ msg: 'Não foi possível encontrar o associado.' });
      else res.status(200).json({ associado });
    else res.status(404).json({ msg: 'Não foi possível encontrar o associado.' });
  },

  async createAssociado(req, res) {
    const { nome, cnpj, senha, endereco } = req.body;
    if (!nome || !cnpj || !senha) {
      res.status(400).json({ msg: 'Dados obrigatórios não foram preenchidos.' });
    }

    //Procurar no BD por associado já existente
    const isAssociadoNew = await Associado.findOne({
      where: { cnpj },
    });

    if (isAssociadoNew)
      res.status(403).json({ msg: 'Associado já foi cadastrado.' });
    else {
      const passwordValid = passwordValidation(senha);
      if (passwordValid !== 'OK')
        return res.status(400).json({ msg: passwordValid });

      const salt = bcrypt.genSaltSync(12);
      const hash = bcrypt.hashSync(senha, salt);
      const associado = await Associado.create({
        nome,
        cnpj,
        senha: hash,
        endereco,
      }).catch((error) => {
        res.status(500).json({ msg: 'Não foi possível inserir os dados.' });
      });
      if (appointment)
        res.status(201).json({ msg: 'Novo associado foi adicionado.' });
      else
        res.status(404).json({ msg: 'Não foi possível cadastrar novo associado.' });
    }
  },

  async deleteAssociado(req, res) {
    const appointmentId = req.params.id;
    const deletedAppointment = await Appointment.destroy({
      where: { id: appointmentId },
    }).catch(async (error) => {
      const appointmentHasRef = await associados.findOne({
        where: { appointmentId },
      }).catch((error) => {
        res.status(500).json({ msg: 'Falha na conexão.' });
      });
      if (appointmentHasRef)
        return res
          .status(403)
          .json({ msg: 'Exame possui exames em seu nome.' });
    });
    if (deletedAppointment != 0)
      res.status(200).json({ msg: 'Exame excluido com sucesso.' });
    else res.status(404).json({ msg: 'Exame não encontrado.' });
  },
};


/*
Cadastro de associados com os campos: Nome da empresa, CNPJ, senha e endereço (sendo este último o único opcional). CNPJ deve ser único, cuide para não permitir duplicações neste campo.
Listar todos os associados.
Listar um associado específico dado o CNPJ.
Editar um associado específico passando o ID. Novamente cuide o campo CNPJ que deve ser único.
Remover associado independente se há registros de entregas relacionados a ele. Remover todos os registros junto.
*/