const Cliente = require('../models/Cliente');

module.exports = {
  async list(req, res) {
    const clientes = await Cliente.findAll({
      order: [['id', 'ASC']],
    }).catch((error) => {
      console.error(error);
      res.status(500).json({ msg: 'Falha na conexão.' });
    });

    if (clientes)
      if (clientes == '')
        res.status(404).json({ msg: 'Não foi possível encontrar clientes.' });
      else res.status(200).json({ clientes });
    else res.status(404).json({ msg: 'Não foi possível encontrar clientes.' });
  },

  async getByCNPJ(req, res) {
    const cnpj = req.params.cnpj;
    const cliente = await Cliente.findOne({
      where: { cnpj }
    }).catch((error) => {
      res.status(500).json({ msg: 'Falha na conexão.' });
    });

    if (cliente)
      if (cliente == '')
        res.status(404).json({ msg: 'Não foi possível encontrar o cliente.' });
      else res.status(200).json({ cliente });
    else res.status(404).json({ msg: 'Não foi possível encontrar o cliente.' });
  },

  async edit(req, res) {
    const cliente = req.body;
    const clienteId = cliente.id;
    if (!clienteId) res.status(400).json({ msg: 'ID vazio.' });
    else {
      const clienteExists = await Cliente.findByPk(clienteId);
      if (!clienteExists)
        res.status(404).json({ msg: 'Cliente não encontrado.' });
      else {
        if (cliente.nomeEmpresa || cliente.cnpj || cliente.endereco) {
          if (cliente.cnpj) {
            const clienteCNPJExists = await Cliente.findOne({
              where: { cnpj }
            });
            if (clienteCNPJExists !== clienteExists)
              return res.status(404).json({ msg: 'Já existe outro cliente com o CNPJ informado.' });
          }
          await cliente.update({
            nomeEmpresa: cliente.nomeEmpresa,
            cnpj: cliente.cnpj.replace(/\./g, '').replace(/-/g, '').replace(/\//g, ''),
            endereco: cliente.endereco
          }, {
            where: { id: clienteId },
          });
          return res
            .status(200)
            .json({ msg: 'Dados do cliente atualizados com sucesso.' });
        } else
          return res
            .status(400)
            .json({ msg: 'Campos obrigatórios não preenchidos.' });
      }
    }
  },

  async add(req, res) {
    const { nomeEmpresa, cnpj, endereco } = req.body;
    if (!nomeEmpresa || !cnpj) {
      res.status(400).json({ msg: 'Dados obrigatórios não foram preenchidos.' });
    }

    //Procurar no BD por cliente já existente
    const isClienteNew = await Cliente.findOne({
      where: { cnpj },
    });

    if (isClienteNew)
      res.status(403).json({ msg: 'Cliente já foi cadastrado.' });
    else {
      const cliente = await Cliente.create({
        nomeEmpresa,
        cnpj: cnpj.replace(/\./g, '').replace(/-/g, '').replace(/\//g, ''),
        endereco,
      }).catch((error) => {
        res.status(500).json({ msg: 'Não foi possível inserir os dados.' });
      });
      if (cliente)
        res.status(201).json({ msg: 'Novo cliente foi adicionado.' });
      else
        res.status(404).json({ msg: 'Não foi possível cadastrar novo cliente.' });
    }
  },

  async delete(req, res) {
    const clienteId = req.params.id;
    const deletedCliente = await Cliente.destroy({
      where: { id: clienteId },
    }).catch(async (error) => {
      const clienteHasEntrega = await Cliente.findOne({
        where: { clienteId },
      }).catch((error) => {
        res.status(500).json({ msg: 'Falha na conexão.' });
      });
      if (clienteHasEntrega) {
        const deletedEntregas = await Entrega.destroy({
          where: { clienteId }
        }).catch((error) => {
          return res.status(500).json({ msg: 'Falha na conexão.' });
        });
      } else return res.status(404).json({ msg: 'Erro ao excluir cliente.' });
    });
    if (deletedCliente != 0)
      res.status(200).json({ msg: 'Cliente excluído com sucesso.' });
    else res.status(404).json({ msg: 'Cliente não encontrado.' });
  },
};
