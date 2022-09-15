const computadores = require('../data/computadores.json');
const atualizarJSON = require('../utils/atualizarJSON');

module.exports = {
    index(req, res) {
        res.json(computadores);
    },

    store(req, res) {
        const computador = {
            id: req.body.id,
            nome: req.body.nome,
            preco: req.body.preco,
          };
        
          computadores.push(computador);
        
          atualizarJSON(computadores, 'computadores.json');
        
          const resp = {
            menssage: "computador inserida com sucesso!",
            data: computador,
          };
        
          res.json(resp);
    },

    update(req, res) {
        const id = parseInt(req.params.id);

  const index = computadores.findIndex((p) => p.id == id);

  const computadorAtualizada = {};
  const { nome, preco } = req.body;
  computadorAtualizada.id = id;
  computadorAtualizada.nome = nome;
  computadorAtualizada.preco = preco;

  computadores[index] = computadorAtualizada;

  atualizarJSON(computadores, "computadores.json");

  res.json({ message: "computador atualizado com sucesso!" });
    },

    destroy(req, res) {
        const id = parseInt(req.params.id);

  const index = computadores.findIndex((p) => p.id == id);

  computadores.splice(index, 1);

  atualizarJSON(computadores, 'computadores.json');

  res.json({ message: "computador removido com sucesso!" });
    }
}