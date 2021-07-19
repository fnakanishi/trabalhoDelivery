const Cliente = require('../models/Cliente');
const Entrega = require('../models/Entrega');
const Motoboy = require('../models/Motoboy');
const sequelize = require('sequelize');

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
    const motoboyId = req.motoboyId;
    let entregas = undefined;
    if (motoboyId)
      entregas = await Entrega.findAll({
        where: {
          motoboyId,
          status: 'REALIZADA'
        }
      }).catch((error) => {
        res.status(500).json({ msg: 'Falha na conexão.' });
      });
    else
      entregas = await Entrega.findAll({
        where: { status: 'REALIZADA' }
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
    const motoboyId = req.motoboyId;
    let entregas = undefined;
    if (motoboyId)
      entregas = await Entrega.findAll({
        where: {
          motoboyId,
          status: { [sequelize.Op.not]: 'REALIZADA' }
        }
      }).catch((error) => {
        res.status(500).json({ msg: 'Falha na conexão.' });
      });
    else
      entregas = await Entrega.findAll({
        where: { status: { [sequelize.Op.not]: 'REALIZADA' } }
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
    const motoboyId = req.motoboyId;
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
    const { id, motoboyId, clienteId, descricao, status, valor } = req.body;
    if (!motoboyId) res.status(400).json({ msg: 'Motoboy não encontrado.' });
    else {
      const motoboyExists = await Motoboy.findByPk(motoboyId);
      if (!motoboyExists)
        res.status(404).json({ msg: 'Motoboy não encontrado.' });
      else {
        if (!id) return res.status(404).json({ msg: 'Entrega não encontrada.' });
        if (descricao || status || valor || clienteId || motoboyId) {
          await entrega.update(entrega, {
            where: { id },
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
    const associadoId = req.associadoId;
    if (!associadoId)
      return res.status(403).json({ msg: 'É necessário fazer o login.' });
    if (!descricao || !motoboyId || !clienteId)
      return res.status(400).json({ msg: 'Dados obrigatórios não foram preenchidos.' });

    //Procurar no BD por motoboy e cliente
    const motoboyExists = await Motoboy.findByPk(motoboyId);
    const clienteExists = await Cliente.findByPk(clienteId);

    if (!motoboyExists || !clienteExists)
      res.status(403).json({ msg: 'Motoboy ou cliente inválido.' });
    else {
      const entrega = await Entrega.create({
        descricao,
        associadoId,
        motoboyId,
        clienteId,
        status: 'PENDENTE'
      }).catch((error) => {
        res.status(500).json({ msg: 'Não foi possível inserir os dados.' });
      });
      if (entrega)
        res.status(201).json({ msg: 'Nova entrega foi adicionada.' });
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
          [sequelize.Op.not]: 'REALIZADA'
        }
      },
    }).catch(async (error) => {
      res.status(500).json({ msg: 'Falha na conexão.' });
    });

    if (deletedEntrega != 0)
      res.status(200).json({ msg: 'Entrega excluída com sucesso.' });
    res.status(404).json({ msg: 'Entrega não encontrada.' });
  },

  async relatorioAdm(req, res) {
    const associadoId = req.associadoId;
    if (!associadoId) return res.status(403).json({ msg: 'Solicitação não autorizada.' });

    const totalClientes = await Cliente.count();
    const totalMotoboys = await Motoboy.count();
    const totalEntregas = await Entrega.count({ where: { associadoId } });

    const top5ClientesIds = await Entrega.findAll({
      atributes: [ 'clienteId', [ sequelize.fn('COUNT', 1), 'contagem' ] ],
      where: { associadoId },
      group: 'clienteId',
      order: [ [sequelize.fn('COUNT', 1), 'DESC'] ],
      limit: 5
    });

    const top5MotoboysIds = await Entrega.findAll({
      atributes: ['motoboyId', [sequelize.fn('COUNT', 1), 'contagem']],
      where: { associadoId },
      group: 'motoboyId',
      order: [[sequelize.fn('COUNT', 1), 'DESC']],
      limit: 5
    });

    const top5Clientes = [];
    const top5Motoboys = [];
    for (let i = 0 ; i < top5ClientesIds.length ; i++) {
      const cliente  = await Cliente.findByPk(top5ClientesIds[i].clienteId);
      top5Clientes.push(cliente);
    }
    for (let i = 0 ; i < top5MotoboysIds.length ; i++) {
      const motoboy  = await Motoboy.findByPk(top5MotoboysIds[i].motoboyId);
      top5Motoboys.push(motoboy);
    }

    const qtdeEntregasRealizadas = await Entrega.count({
      where: {
        associadoId,
        status: 'REALIZADA'
      }
    });
    const qtdeEntregasTotais = await Entrega.count({
      where: { associadoId }
    });

    const porcentagemRealizadas = qtdeEntregasTotais > 0 ? (qtdeEntregasRealizadas / qtdeEntregasTotais) * 100 : 100;
    const porcentagemPendentes = 100 - porcentagemRealizadas;
    console.log({totalClientes, totalMotoboys, totalEntregas, top5Clientes, top5Motoboys, porcentagemRealizadas});
    if (!totalClientes || !totalMotoboys ||
      !totalEntregas || !top5Clientes ||
      !top5Motoboys)
      return res.status(404).json({ msg: 'Não foi possível retornar uma resposta' });
      
    return res.status(200).json({
      totalClientes,
      totalMotoboys,
      totalEntregas,
      top5Clientes,
      top5Motoboys,
      entregasRealizadas: `${porcentagemRealizadas}%`,
      entregasPendentes: `${porcentagemPendentes}%`
    });
  },

  async relatorioFin(req, res) {
    const associadoId = req.associadoId;
    if (!associadoId) return res.status(403).json({ msg: 'Solicitação não autorizada.' });

    const valores = await Entrega.sum('valor', {
      where: {
        associadoId,
        status: 'REALIZADA'
      }
    });
    console.log(valores);
    if (!valores) return res.status(404).json({ msg: 'Não foi possível retornar uma resposta' });

    res.status(200).json({
      valorTotal: `R$${valores}`,
      valorMotoboy: `R$${valores * 0.7}`,
      valorAssociado: `R$${valores * 0.3}`,
    });
  },

  async relatorioFinMotoboy(res, req) {
    const motoboyId = req.motoboyId;
    if (!motoboyId) return res.status(403).json({ msg: 'Solicitação não autorizada.' });

    const valores = await Entrega.sum('valor', {
      where: {
        id: motoboyId,
        status: 'REALIZADA'
      }
    });
    if (!valores) return res.status(404).json({ msg: 'Não foi possível retornar uma resposta' });

    res.status(200).json({
      valorTotal: `R$${valores}`,
      valorComissao: `R$${valores * 0.7}`
    });
  },

  async editMotoboy(req, res) {
    const { id, status, valor } = req.body;
    const motoboyId = req.motoboyId;
    if (!motoboyId) res.status(403).json({ msg: 'Solicitação não autorizada.' });
    else {
      if (!id) return res.status(404).json({ msg: 'Entrega não encontrada.' });
      const entrega = await Entrega.findOne({
        where: {
          id,
          motoboyId,
          status: { [sequelize.Op.not]: 'REALIZADA' }
        }
      }).catch((error) => {
        res.status(500).json({ msg: 'Falha na conexão.' });
      });
      if (entrega) {
        await entrega.update({
          valor,
          status
        }, {
          where: { id },
        });
        return res
          .status(200)
          .json({ msg: 'Dados da entrega atualizados com sucesso.' });
      } else
        return res
          .status(400)
          .json({ msg: 'Entrega não localizada.' });
    }
  },
};