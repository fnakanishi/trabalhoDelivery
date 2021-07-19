const Associado = require('../models/Associado');
const Entrega = require('../models/Entrega');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_ASSOCIADO_SECRET, {
    expiresIn: 18000,
  });
  console.log(token);
  return token;
}

module.exports = {
  async login(req, res) {
    const { cnpj, senha } = req.body;

    if(!cnpj || !senha)
      return res.status(400).json({ msg: 'Campos obrigatórios vazios.' });

    try {
      const associado = await Associado.findOne({
        where: { cnpj: cnpj.replace(/\./g, '').replace(/-/g, '').replace(/\//g, '') }
      });
      if (!associado)
        return res.status(404).json({ msg: 'Usuário ou senha inválidos.' });
      else {
        if (bcrypt.compareSync(senha, associado.senha)) {
          const token = generateToken(associado.id);
          return res.status(200).json({ msg: 'Autenticado com sucesso.', token });
        }
        else
          return res.status(404).json({ msg: 'Usuário ou senha inválidos.' });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async get(req, res) {
    const associadoId = req.associadoId;
    if (!associadoId) return res.status(403).json({ msg: 'Solicitação não autorizada.' });

    const associado = await Associado.findByPk(associadoId);
    if (associado) res.status(200).json({ associado });
    res.status(404).json({ msg: 'Não foi possível encontrar o associado.' });
  },

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
    const { id, nomeEmpresa, cnpj, senha, endereco } = req.body;
    // Verifica se existe associadoId na requisição
    // (se tiver quer dizer que é alteração do próprio associado, se não, é alteração da ACP)
    const associadoId = req.associadoId ? req.associadoId : id;

    if (!associadoId) res.status(400).json({ msg: 'ID vazio.' });
    else {
      const associadoExists = await Associado.findByPk(associadoId);
      if (!associadoExists)
        res.status(404).json({ msg: 'Associado não encontrado.' });
      else {
        if (nomeEmpresa || cnpj || endereco || senha) {
          if (cnpj.replace(/\./g, '').replace(/-/g, '').replace(/\//g, '') !== associadoExists.cnpj.replace(/\./g, '').replace(/-/g, '').replace(/\//g, '')) {
            const associadoCNPJExists = await Associado.findOne({
              where: { cnpj: cnpj.replace(/\./g, '').replace(/-/g, '').replace(/\//g, '') }
            });
            if (associadoCNPJExists)
              return res.status(404).json({ msg: 'Já existe outro associado com o CNPJ informado.' });
          }
          const salt = bcrypt.genSaltSync(12);
          const hash = bcrypt.hashSync(associado.senha, salt);
          await associado.update({
            nomeEmpresa: nomeEmpresa ? nomeEmpresa : associadoExists.nomeEmpresa,
            cnpj: cnpj ? cnpj.replace(/\./g, '').replace(/-/g, '').replace(/\//g, '') : associadoExists.cnpj.replace(/\./g, '').replace(/-/g, '').replace(/\//g, ''),
            senha: senha ? hash : associadoExists.senha,
            endereco: endereco ? endereco : associadoExists.endereco
          }, {
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
    const { nomeEmpresa, cnpj, senha, endereco } = req.body;
    console.log(req.body);
    if (!nomeEmpresa || !cnpj || !senha) {
      res.status(400).json({ msg: 'Dados obrigatórios não foram preenchidos.' });
    }

    //Procurar no BD por associado já existente
    const isAssociadoNew = await Associado.findOne({
      where: { cnpj: cnpj.replace(/\./g, '').replace(/-/g, '').replace(/\//g, '') },
    });

    if (isAssociadoNew)
      res.status(403).json({ msg: 'Associado já foi cadastrado.' });
    else {
      const salt = bcrypt.genSaltSync(12);
      const hash = bcrypt.hashSync(senha, salt);
      const associado = await Associado.create({
        nomeEmpresa,
        cnpj: cnpj.replace(/\./g, '').replace(/-/g, '').replace(/\//g, ''),
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