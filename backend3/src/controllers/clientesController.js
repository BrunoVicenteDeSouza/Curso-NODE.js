const clientes = require("../data/clientes.json");
const atualizarJSON = require("../utils/atualizarJSON");

module.exports = {
  index(req, res) {
    res.json(clientes);
  },

  store(req, res) {
    const cliente = {
      id: req.body.id,
      nome: req.body.nome,
      email: req.body.email,
      telefone: req.body.telefone,
    };

    clientes.push(cliente);

    atualizarJSON(clientes, "clientes.json");

    const resp = {
      menssage: "cliente inserida com sucesso!",
      data: cliente,
    };

    res.json(resp);
  },

  update(req, res) {
    const id = parseInt(req.params.id);

    const index = clientes.findIndex((p) => p.id == id);

    const clienteAtualizada = {};
    const { nome, email, telefone } = req.body;
    clienteAtualizada.id = id;
    clienteAtualizada.nome = nome;
    clienteAtualizada.email = email;
    clienteAtualizada.telefone = telefone;

    clientes[index] = clienteAtualizada;

    atualizarJSON(clientes, "clientes.json");

    res.json({ message: "cliente atualizado com sucesso!" });
  },

  destroy(req, res) {
    const id = parseInt(req.params.id);

    const index = clientes.findIndex((p) => p.id == id);

    clientes.splice(index, 1);

    atualizarJSON(clientes, "clientes.json");

    res.json({ message: "cliente removido com sucesso!" });
  },
};
