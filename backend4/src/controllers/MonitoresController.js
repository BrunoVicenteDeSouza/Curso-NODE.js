const { Monitor } = require('../db/models');

module.exports = {
  async index(req, res) {
    try {
      const monitores = await Monitor.findAll();

      res.json(monitores);
    } catch (error) {
      console.error(error);
      res.json({ message: 'Falha ao buscar clientes.' });
    }
  },

  async show(req, res) {
    const id = parseInt(req.params.id);
    try {
      const monitor = await Monitor.findOne({ where: { id: id } });

      res.json(monitor);
    } catch (error) {
      console.error(error);
      res.json({ message: 'Falha ao buscar pessoa.' });
    }
  },

  async store(req, res) {
    const body = {
      nome: req.body.nome,
      preco: req.body.preco,
      descricao: req.body.descricao
    };

    try {
      const monitor = await Monitor.create(body);

      const resp = {
        menssage: 'Monitor inserido com sucesso!',
        data: monitor,
      };

      res.json(resp);
    } catch (error) {
      console.error(error);
      res.json({ message: 'Falha ao inserir monitor.' });
    }
  },

  async update(req, res) {
    const id = parseInt(req.params.id);

    try {
      const monitor = await Monitor.findOne({ where: { id: id } });

      const monitorAtualizado = {};
      const { nome, preco, descricao } = req.body;
      monitorAtualizado.id = id;
      monitorAtualizado.nome = nome;
      monitorAtualizado.preco = preco;
      monitorAtualizado.descricao = descricao;

      monitor.set(monitorAtualizado);
      await monitor.save();

      res.json({ message: 'Monitor atualizado com sucesso' });
    } catch (error) {
      console.error(error);
      res.json({ message: 'Falha ao inserir monitor.' });
    }
  },

  async destroy(req, res) {
    const id = parseInt(req.params.id);

    try {
      await Monitor.destroy({ where: { id: id } });

      res.json({ message: 'Monitor removido com sucesso!' });
    } catch (error) {
      console.error(error);
      res.json({ message: 'Falha ao inserir monitor.' });
    }
  },
};