const JogoService = require("../services/JogoService");

module.exports = {
  async index(req, res) {
    const jogos = await JogoService.index();

    return res.json(jogos);
  },

  async show(req, res) {
    const id = parseInt(req.params.id);

    const jogo = await JogoService.show({ id });

    return res.json(jogo);
  },

  async store(req, res) {
    const { nome, preco, console_id } = req.body;

    const jogo = await JogoService.create({
      nome,
      preco,
      console_id,
    });

    res.json(jogo);
  },

  async update(req, res) {
    const { nome, preco, console_id, id } = req.body;

    const jogoAtualizado = await JogoService.update({
      id,
      nome,
      preco,
      console_id,
    });

    return res.json(jogoAtualizado);
  },

  async destroy(req, res) {
    const id = parseInt(req.params.id);

    const destroy = await JogoService.destroy({ id });

    return res.json(destroy);
  },
};
