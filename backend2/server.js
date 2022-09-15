const fs = require("fs");
const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

const clientes = require("./data/clientes.json");
const computadores = require("./data/computadores.json");
const monitores = require("./data/monitores.json");

app.get("/", (req, res) => {
  res.send("Aula 2");
});

app.get("/clientes", (req, res) => {
  res.json(clientes);
});

app.post("/clientes", (req, res) => {
  const cliente = {
    id: req.body.id,
    nome: req.body.nome,
    email: req.body.email,
    telefone: req.body.telefone,
  };

  clientes.push(cliente);

  atualizarJSONClientes(clientes);

  const resp = {
    menssage: "cliente inserida com sucesso!",
    data: cliente,
  };

  res.json(resp);
});

app.put("/clientes/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = clientes.findIndex((p) => p.id == id);

  const clienteAtualizada = {};
  const { nome, email, telefone } = req.body;
  clienteAtualizada.id = id;
  clienteAtualizada.nome = nome;
  clienteAtualizada.email = email;
  clienteAtualizada.telefone = telefone;

  clientes[index] = clienteAtualizada;

  atualizarJSONClientes(clientes);

  res.json({ message: "cliente atualizado com sucesso!" });
});

app.delete("/clientes/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = clientes.findIndex((p) => p.id == id);

  clientes.splice(index, 1);

  atualizarJSONClientes(clientes);

  res.json({ message: "cliente removido com sucesso!" });
});

app.get("/computadores", (req, res) => {
  res.json(computadores);
});

app.post("/computadores", (req, res) => {
  const computador = {
    id: req.body.id,
    nome: req.body.nome,
    preco: req.body.preco,
  };

  computadores.push(computador);

  atualizarJSONComputadores(computadores);

  const resp = {
    menssage: "computador inserida com sucesso!",
    data: computador,
  };

  res.json(resp);
});

app.put("/computadores/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = computadores.findIndex((p) => p.id == id);

  const computadorAtualizada = {};
  const { nome, preco } = req.body;
  computadorAtualizada.id = id;
  computadorAtualizada.nome = nome;
  computadorAtualizada.preco = preco;

  computadores[index] = computadorAtualizada;

  atualizarJSONComputadores(computadores);

  res.json({ message: "computador atualizado com sucesso!" });
});

app.delete("/computadores/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = computadores.findIndex((p) => p.id == id);

  computadores.splice(index, 1);

  atualizarJSONComputadores(computadores);

  res.json({ message: "computador removido com sucesso!" });
});

app.get("/monitores", (req, res) => {
  res.json(monitores);
});

app.post("/monitores", (req, res) => {
  const monitor = {
    id: req.body.id,
    nome: req.body.nome,
    preco: req.body.preco,
    descricao: req.body.descricao,
  };

  monitores.push(monitor);

  atualizarJSONMonitores(monitores);

  const resp = {
    menssage: "monitor inserido com sucesso!",
    data: monitor,
  };

  res.json(resp);
});

app.put("/monitores/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = monitores.findIndex((p) => p.id == id);

  const monitorAtualizada = {};
  const { nome, preco, descricao } = req.body;
  monitorAtualizada.id = id;
  monitorAtualizada.nome = nome;
  monitorAtualizada.preco = preco;
  monitorAtualizada.descricao = descricao;

  monitores[index] = monitorAtualizada;

  atualizarJSONMonitores(monitores);

  res.json({ message: "monitor atualizada com sucesso!" });
});

app.delete("/monitores/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = monitores.findIndex((p) => p.id == id);

  monitores.splice(index, 1);

  atualizarJSONMonitores(monitores);

  res.json({ message: "monitor removido com sucesso!" });
});

function atualizarJSONClientes(clientes) {
  const json = JSON.stringify(clientes);
  fs.writeFile("./data/clientes.json", json, "utf-8", (err) => {
    if (err) {
      return console.error(err);
    }
  });
}

function atualizarJSONComputadores(computadores) {
  const json = JSON.stringify(computadores);
  fs.writeFile("./data/computadores.json", json, "utf-8", (err) => {
    if (err) {
      return console.error(err);
    }
  });
}

function atualizarJSONMonitores(monitores) {
  const json = JSON.stringify(monitores);
  fs.writeFile("./data/monitores.json", json, "utf-8", (err) => {
    if (err) {
      return console.error(err);
    }
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
