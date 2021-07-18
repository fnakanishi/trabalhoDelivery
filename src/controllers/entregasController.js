const Entrega = require('../models/Entrega');
const Motoboy = require('../models/Motoboy');
const Cliente = require('../models/Cliente');
const Sequelize = require('sequelize');

module.exports = {
  async list(req, res) {
    const entregas = await Entrega.findAll({
      order: [['id', 'ASC']],
    }).catch((error) => {
      console.error(error);
      res.status(500).json({ msg: 'Falha na conexão.' });
    });

    if (entregas)
      if (entregas == '')
        res.status(404).json({ msg: 'Não foi possível encontrar todas as entregas.' });
      else res.status(200).json({ entregas });
    else res.status(404).json({ msg: 'Não foi possível encontrar todas as entregas.' });
  },

  async findCompleted(req, res) {
    const entregas = await Entrega.findAll({
      where: { motoboyId, status: 'REALIZADA' }
    }).catch((error) => {
      res.status(500).json({ msg: 'Falha na conexão.' });
    });

    if (entregas)
      if (entregas == '')
        res.status(404).json({ msg: 'Não foi possível encontrar as entregas.' });
      else res.status(200).json({ entregas });
    else res.status(404).json({ msg: 'Não foi possível encontrar as entregas.' });
  },

  async findPending(req, res) {
    const entregas = await Entrega.findAll({
      where: {
        motoboyId,
        status: {
          [Sequelize.Op.not]: 'REALIZADA'
        }
      }
    }).catch((error) => {
      res.status(500).json({ msg: 'Falha na conexão.' });
    });

    if (entregas)
      if (entregas == '')
        res.status(404).json({ msg: 'Não foi possível encontrar as entregas.' });
      else res.status(200).json({ entregas });
    else res.status(404).json({ msg: 'Não foi possível encontrar as entregas.' });
  },

  async findByMotoboy(req, res) {
    const motoboyId = req.params.motoboyId;
    const entregas = await Entrega.findAll({
      where: { motoboyId }
    }).catch((error) => {
      res.status(500).json({ msg: 'Falha na conexão.' });
    });

    if (entregas)
      if (entregas == '')
        res.status(404).json({ msg: 'Não foi possível encontrar as entregas.' });
      else res.status(200).json({ entregas });
    else res.status(404).json({ msg: 'Não foi possível encontrar as entregas.' });
  },

  async edit(req, res) {
    const entrega = req.body;
    const motoboyId = entrega.motoboyId;
    if (!motoboyId) res.status(400).json({ msg: 'Motoboy não encontrado.' });
    else {
      const motoboyExists = await Motoboy.findByPk(motoboyId);
      if (!motoboyExists)
        res.status(404).json({ msg: 'Motoboy não encontrado.' });
      else {
        if (entrega.status || entrega.valor) {
          await entrega.update(entrega, {
            where: { id: entrega.id },
          });
          return res
            .status(200)
            .json({ msg: 'Dados da entrega atualizados com sucesso.' });
        } else
          return res
            .status(400)
            .json({ msg: 'Campos obrigatórios não preenchidos.' });
      }
    }
  },

  async add(req, res) {
    const { descricao, motoboyId, clienteId } = req.body;
    if (!descricao || !motoboyId || !clienteId) {
      res.status(400).json({ msg: 'Dados obrigatórios não foram preenchidos.' });
    }

    //Procurar no BD por motoboy já existente
    const motoboyExists = await Motoboy.findByPk(motoboyId);
    const clienteExists = await Cliente.findByPk(clienteId);

    if (!motoboyExists || !clienteExists)
      res.status(403).json({ msg: 'Motoboy ou cliente inválido.' });
    else {
      const entrega = await Entrega.create({
        descricao,
        motoboyId,
        clienteId,
      }).catch((error) => {
        res.status(500).json({ msg: 'Não foi possível inserir os dados.' });
      });
      if (entrega)
        res.status(201).json({ msg: 'Novo entrega foi adicionado.' });
      else
        res.status(404).json({ msg: 'Não foi possível cadastrar nova entrega.' });
    }
  },

  async delete(req, res) {
    const entregaId = req.params.id;
    const deletedEntrega = await Entrega.destroy({
      where: {
        id: entregaId,
        status: {
          [Sequelize.Op.not]: 'REALIZADA'
        }
      },
    }).catch(async (error) => {
      const entregaExists = await Entrega.findOne({
        where: { id: entregaId },
      }).catch((error) => {
        res.status(500).json({ msg: 'Falha na conexão.' });
      });
      if (entregaExists)
        return res.status(400).json({ msg: 'Entrega concluída.' });
    });
    if (deletedEntrega != 0)
      res.status(200).json({ msg: 'Entrega excluída com sucesso.' });
    res.status(404).json({ msg: 'Entrega não encontrada.' });
  },
};