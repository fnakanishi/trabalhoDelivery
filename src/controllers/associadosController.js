const Associado = require('../models/Associado');
const Entrega = require('../models/Entrega');
const { cnpjValidation, passwordValidation, generateToken } = require('./generalController');

module.exports = {
  async list(req, res) {
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

  async getByCNPJ(req, res) {
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

  async edit(req, res) {
    const associado = req.body;
    const associadoId = associado.id;
    if (!associadoId) res.status(400).json({ msg: 'ID vazio.' });
    else {
      const associadoExists = await Associado.findByPk(associadoId);
      if (!associadoExists)
        res.status(404).json({ msg: 'Associado não encontrado.' });
      else {
        if (associado.nomeEmpresa || associado.cnpj || associado.endereco) {
          if (associado.cnpj) {
            const associadoCNPJExists = await Associado.findOne({
              where: { cnpj }
            });
            if (associadoCNPJExists)
              return res.status(404).json({ msg: 'Já existe outro associado com o CNPJ informado.' });
            const cnpjValid = cnpjValidation(associado.cnpj);
            if (cnpjValid !== 'OK')
              return res.status(404).json({ msg: cnpjValid });
          }
          await associado.update(associado, {
            where: { id: associadoId },
          });
          return res
            .status(200)
            .json({ msg: 'Dados do associado atualizados com sucesso.' });
        } else
          return res
            .status(400)
            .json({ msg: 'Campos obrigatórios não preenchidos.' });
      }
    }
  },

  async add(req, res) {
    const { nome, cnpj, senha, endereco } = req.body;
    if (!nome || !cnpj || !senha) {
      res.status(400).json({ msg: 'Dados obrigatórios não foram preenchidos.' });
    }

    const cnpjValid = cnpjValidation(cnpj);
    if (cnpjValid !== 'OK')
      return res.status(400).json({ msg: cnpjValid });

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
        nomeEmpresa,
        cnpj,
        senha: hash,
        endereco,
      }).catch((error) => {
        res.status(500).json({ msg: 'Não foi possível inserir os dados.' });
      });
      if (associado)
        res.status(201).json({ msg: 'Novo associado foi adicionado.' });
      else
        res.status(404).json({ msg: 'Não foi possível cadastrar novo associado.' });
    }
  },

  async delete(req, res) {
    const associadoId = req.params.id;
    const deletedAssociado = await Associado.destroy({
      where: { id: associadoId },
    }).catch(async (error) => {
      const associadoHasEntregas = await Entrega.findAll({
        where: { associadoId },
      }).catch((error) => {
        res.status(500).json({ msg: 'Falha na conexão.' });
      });
      if (associadoHasEntregas) {
        const deletedEntregas = await Entrega.destroy({
          where: { associadoId }
        }).catch((error) => {
          return res.status(500).json({ msg: 'Falha na conexão.' });
        });
      } else return res.status(404).json({ msg: 'Erro ao excluir associado.' });
    });
    if (deletedAssociado != 0)
      res.status(200).json({ msg: 'Associado excluído com sucesso.' });
    else res.status(404).json({ msg: 'Associado não encontrado.' });
  },
};