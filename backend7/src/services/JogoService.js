const { Jogo, Console } = require("../db/models");
const AppError = require("../shared/error/AppError");

module.exports = {
  async index() {
    const jogos = await Jogo.findAll({ include: Console });

    return jogos;
  },

  async show({ id }) {
    const jogo = await Jogo.findOne({ where: { id: id }, include: Console });

    return jogo;
  },

  async create({ nome, preco, console_id }) {
    const jogoAlredyExists = await Jogo.findOne({ where: { nome } });

    if (jogoAlredyExists) {
      throw new AppError("Jogo já existente.");
    }

    if (!nome) {
      throw new AppError("Favor informar o campo nome");
    }

    if (nome && nome.length > 60) {
      throw new AppError("O campo nome deve ter no máximo 60 caracteres.");
    }

    await Jogo.create({ nome, preco, console_id });

    return {
      message: "jogo inserido com sucesso!",
      nome,
      preco,
      console_id,
    };
  },

  async update({ nome, preco, console_id, id: jogo_id }) {
    

    const jogo = await Jogo.findOne({ jogo_id });
    const jogoAlredyExists = await Jogo.findOne({ where: { nome } });

    if (jogoAlredyExists) {
      throw new AppError("Jogo já existente.");
    }

    if (!nome) {
      throw new AppError("Favor informar o campo nome");
    }

    if (nome && nome.length > 60) {
      throw new AppError("O campo nome deve ter no máximo 60 caracteres.");
    }

    const jogoAtualizado = {};
    jogoAtualizado.id = jogo_id;
    jogoAtualizado.nome = nome;
    jogoAtualizado.preco = preco;
    jogoAtualizado.console_id = console_id;

    jogo.set(jogoAtualizado);
    await jogo.save();

    return {
      message: "Jogo atualizado com sucesso!",
      jogoAtualizado,
    };
  },

  async destroy({ id }) {
    const idInexistente = await Jogo.findOne({ where: { id } });

    if (!idInexistente) {
      throw new AppError("Jogo não existe.");
    }

    await Jogo.destroy({ where: { id } });

    return { message: "Jogo apagado com sucesso." };
  },
};
