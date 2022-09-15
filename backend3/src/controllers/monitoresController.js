const monitores = require("../data/monitores.json");
const atualizarJSON = require("../utils/atualizarJSON");

module.exports = {
  index(req, res) {
    res.json(monitores);
  },

  store(req, res) {
    const monitor = {
      id: req.body.id,
      nome: req.body.nome,
      preco: req.body.preco,
      descricao: req.body.descricao,
    };

    monitores.push(monitor);

    atualizarJSON(monitores, "monitores.json");

    const resp = {
      menssage: "monitor inserido com sucesso!",
      data: monitor,
    };

    res.json(resp);
  },

  update(req, res) {
    const id = parseInt(req.params.id);

    const index = monitores.findIndex((p) => p.id == id);

    const monitorAtualizada = {};
    const { nome, preco, descricao } = req.body;
    monitorAtualizada.id = id;
    monitorAtualizada.nome = nome;
    monitorAtualizada.preco = preco;
    monitorAtualizada.descricao = descricao;

    monitores[index] = monitorAtualizada;

    atualizarJSON(monitores, "monitores.json");

    res.json({ message: "monitor atualizada com sucesso!" });
  },

  destroy(req, res) {
    const id = parseInt(req.params.id);

    const index = monitores.findIndex((p) => p.id == id);

    monitores.splice(index, 1);

    atualizarJSON(monitores, "monitores.json");

    res.json({ message: "monitor removido com sucesso!" });
  },
};
