const { Console } = require("../db/models");
const AppError = require("../shared/error/AppError");

module.exports = {
  async index() {
    const consoles = await Console.findAll();

    return consoles;
  },

  async show({ id }) {
    const console = await Console.findOne({ where: { id: id } });

    return console;
  },

  async create({ descricao }) {
    const consoleAlredyExists = await Console.findOne({ where: { descricao } });

    if (consoleAlredyExists) {
      throw new AppError("Console já existente.");
    }

    if (!descricao) {
      throw new AppError("Favor informar o campo descricao");
    }

    if (descricao && descricao.length > 20) {
      throw new AppError("O campo descrição deve ter no máximo 20 caracteres.");
    }

    await Console.create({ descricao });

    return {
      message: "Console inserido com sucesso!",
      descricao,
    };
  },

  async update({ descricao, id: console_id }) {
    const consoleAlredyExists = await Console.findOne({ where: { descricao } });

    if (consoleAlredyExists) {
      throw new AppError("Console já existente.");
    }

    if (!descricao) {
      throw new AppError("Favor informar o campo descricao");
    }

    if (descricao && descricao.length > 20) {
      throw new AppError("O campo descrição deve ter no máximo 20 caracteres.");
    }

    const console = await Console.findOne({ console_id });

    const consoleAtualizado = {};
    consoleAtualizado.id = console_id;
    consoleAtualizado.descricao = descricao;

    console.set(consoleAtualizado);
    await console.save();

    return {
      message: "Console atualizado com sucesso!",
      consoleAtualizado,
    };
  },

  async destroy({ id }) {
    const idInexistente = await Console.findOne({ where: { id } });

    if (!idInexistente) {
      throw new AppError("Console não existe.");
    }

    await Console.destroy({ where: { id } });

    return { message: "Console apagado com sucesso." };
  },
};
