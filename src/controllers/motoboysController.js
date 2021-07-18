const Motoboy = require('../models/Motoboy');
const Entrega = require('../models/Entrega');
const { cpfValidation, passwordValidation, generateToken } = require('./generalController');

module.exports = {
  async list(req, res) {
    const motoboys = await Motoboy.findAll({
      order: [['id', 'ASC']],
    }).catch((error) => {
      console.error(error);
      res.status(500).json({ msg: 'Falha na conexão.' });
    });

    if (motoboys)
      if (motoboys == '')
        res.status(404).json({ msg: 'Não foi possível encontrar todos os motoboys.' });
      else res.status(200).json({ motoboys });
    else res.status(404).json({ msg: 'Não foi possível encontrar todos os motoboys.' });
  },

  async getByCPF(req, res) {
    const cpf = req.params.cpf;
    const motoboy = await Motoboy.findOne({
      where: { cpf }
    }).catch((error) => {
      res.status(500).json({ msg: 'Falha na conexão.' });
    });

    if (motoboy)
      if (motoboy == '')
        res.status(404).json({ msg: 'Não foi possível encontrar o motoboy.' });
      else res.status(200).json({ motoboy });
    else res.status(404).json({ msg: 'Não foi possível encontrar o motoboy.' });
  },

  async edit(req, res) {
    const motoboy = req.body;
    const motoboyId = motoboy.id;
    if (!motoboyId) res.status(400).json({ msg: 'ID vazio.' });
    else {
      const motoboyExists = await Motoboy.findByPk(motoboyId);
      if (!motoboyExists)
        res.status(404).json({ msg: 'Motoboy não encontrado.' });
      else {
        if (motoboy.nome || motoboy.cpf || motoboy.telefone) {
          if (motoboy.cpf) {
            const motoboyCPFExists = await Motoboy.findOne({
              where: { cpf }
            });
            if (motoboyCPFExists)
              return res.status(404).json({ msg: 'Já existe outro motoboy com o CPF informado.' });
            const cpfValid = cpfValidation(motoboy.cpf);
            if (cpfValid !== 'OK')
              return res.status(404).json({ msg: cpfValid });
          }
          await motoboy.update(motoboy, {
            where: { id: motoboyId },
          });
          return res
            .status(200)
            .json({ msg: 'Dados do motoboy atualizados com sucesso.' });
        } else
          return res
            .status(400)
            .json({ msg: 'Campos obrigatórios não preenchidos.' });
      }
    }
  },

  async add(req, res) {
    const { nome, cpf, senha, telefone } = req.body;
    if (!nome || !cpf || !senha || !telefone) {
      res.status(400).json({ msg: 'Dados obrigatórios não foram preenchidos.' });
    }

    const cpfValid = cpfValidation(cpf);
    if (cpfValid !== 'OK')
      return res.status(400).json({ msg: cpfValid });

    //Procurar no BD por motoboy já existente
    const isMotoboyNew = await Motoboy.findOne({
      where: { cpf },
    });

    if (isMotoboyNew)
      res.status(403).json({ msg: 'Motoboy já foi cadastrado.' });
    else {
      const passwordValid = passwordValidation(senha);
      if (passwordValid !== 'OK')
        return res.status(400).json({ msg: passwordValid });

      const salt = bcrypt.genSaltSync(12);
      const hash = bcrypt.hashSync(senha, salt);
      const motoboy = await Motoboy.create({
        nome,
        cpf,
        senha: hash,
        telefone,
      }).catch((error) => {
        res.status(500).json({ msg: 'Não foi possível inserir os dados.' });
      });
      if (motoboy)
        res.status(201).json({ msg: 'Novo motoboy foi adicionado.' });
      else
        res.status(404).json({ msg: 'Não foi possível cadastrar novo motoboy.' });
    }
  },

  async delete(req, res) {
    const motoboyId = req.params.id;
    const deletedMotoboy = await Motoboy.destroy({
      where: { id: motoboyId },
    }).catch(async (error) => {
      const motoboyHasEntregas = await Entrega.findOne({
        where: { motoboyId },
      }).catch((error) => {
        res.status(500).json({ msg: 'Falha na conexão.' });
      });
      if (motoboyHasEntregas) {
        const deletedEntregas = await Entrega.destroy({
          where: { motoboyId }
        }).catch((error) => {
          return res.status(500).json({ msg: 'Falha na conexão.' });
        });
      } else return res.status(404).json({ msg: 'Erro ao excluir motoboy.' });
    });
    if (deletedMotoboy != 0)
      res.status(200).json({ msg: 'Motoboy excluído com sucesso.' });
    else res.status(404).json({ msg: 'Motoboy não encontrado.' });
  },
};