const ConsoleService = require("../services/ConsoleService");

module.exports = {
  async index(req, res) {
    const consoles = await ConsoleService.index();

    return res.json(consoles);
  },

  async show(req, res) {
    const id = parseInt(req.params.id);

    const console = await ConsoleService.show({ id });

    return res.json(console);
  },

  async store(req, res) {
    const { descricao } = req.body;

    const response = await ConsoleService.create({ descricao });

    return res.json(response);
  },

  async update(req, res) {
    const { descricao, id } = req.body;

    const consoleAtualizado = await ConsoleService.update({ id, descricao });

    return res.json(consoleAtualizado);
  },

  async destroy(req, res) {
    const id = parseInt(req.params.id);

    const destroy = await ConsoleService.destroy({ id });

    return res.json(destroy);
  },
};
