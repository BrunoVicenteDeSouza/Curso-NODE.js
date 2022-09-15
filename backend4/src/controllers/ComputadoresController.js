const { Computador } = require('../db/models');

module.exports = {
  async index(req, res) {
    try {
      const computadores = await Computador.findAll();

      res.json(computadores);
    } catch (error) {
      console.error(error);
      res.json({ message: 'Falha ao buscar clientes.' });
    }
  },

  async show(req, res) {
    const id = parseInt(req.params.id);
    try {
      const computador = await Computador.findOne({ where: { id: id } });

      res.json(computador);
    } catch (error) {
      console.error(error);
      res.json({ message: 'Falha ao buscar computador.' });
    }
  },

  async store(req, res) {
    const body = {
      nome: req.body.nome,
      preco: req.body.preco,
    };

    try {
      const computador = await Computador.create(body);

      const resp = {
        menssage: 'Computador inserido com sucesso!',
        data: computador,
      };

      res.json(resp);
    } catch (error) {
      console.error(error);
      res.json({ menssage: 'Falha ao inserir computador.' });
    }
  },

  async update(req, res) {
    const id = parseInt(req.params.id);

    try {
      const computador = await Computador.findOne({ where: { id: id } });

      const computadorAtualizado = {};
      const { nome, preco } = req.body;
      computadorAtualizado.id = id;
      computadorAtualizado.nome = nome;
      computadorAtualizado.preco = preco;

      computador.set(computadorAtualizado);
      await computador.save();


      res.json({ message: 'Computador atualizado com sucesso' });
    } catch (error) {
      console.error(error);
      res.json({ message: 'Falha ao atualizar computador.' });
    }
  },

  async destroy(req, res) {
    const id = parseInt(req.params.id);

    try {
      await Computador.destroy({ where: { id: id } });

      res.json({ message: 'Computador removido com sucesso!' });
    } catch (error) {
      console.error(error);
      res.json({ message: 'Falha ao excluir computador.' });
    }
  },
};

