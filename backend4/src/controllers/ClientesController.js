const { Cliente } = require('../db/models');

module.exports = {
  async index(req, res) {
    try {
      const clientes = await Cliente.findAll();

      res.json(clientes);
    } catch (error) {
      console.error(error);
      res.json({ message: 'Falha ao buscar clientes.' });
    }
  },

  async show(req, res) {
    const id = parseInt(req.params.id);
    try {
      const cliente = await Cliente.findOne({ where: { id: id } });

      res.json(cliente);
    } catch (error) {
      console.error(error);
      res.json({ message: 'Falha ao buscar cliente.' })
    }
  },

  async store(req, res) {
    const body = {
      id: req.body.id,
      nome: req.body.nome,
      telefone: req.body.telefone,
      email: req.body.email,
    };

    try {
      const cliente = await Cliente.create(body)

      const resp = {
        menssage: 'Cliente inserido com sucesso!',
        data: cliente,
      };

      res.json(resp);
    } catch (error) {
      console.error(error);
      res.json({ message: 'Falha ao inserir cliente' });
    }
  },

  async update(req, res) {
    const id = parseInt(req.params.id);

    try {
      const cliente = await Cliente.findOne({ where: { id: id } });

      const clienteAtualizado = {};
      const { nome, telefone, email } = req.body;
      clienteAtualizado.id = id;
      clienteAtualizado.nome = nome;
      clienteAtualizado.telefone = telefone;
      clienteAtualizado.email = email;

      cliente.set(clienteAtualizado);
      await cliente.save();

      res.json({ message: 'Cliente atualizado com sucesso!' });
    } catch (error) {
      console.error(error);
      res.json({ menssage: 'Falha ao atualizar cliente.' });
    }
  },

  async destroy(req, res) {
    const id = parseInt(req.params.id);

    try {
      await Cliente.destroy({ where: { id: id } });

      res.json({ message: 'Cliente removido com sucesso' });
    } catch (error) {
      console.error(error);
      res.json({ message: 'Falha ao excluir cliente. ' });
    }
  },
};