const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../db/models");
const AppError = require("../shared/error/AppError");
const emailValidator = require("email-validator");

module.exports = {
  async generateHash(value) {
    return await bcrypt.hash(value, 8);
  },

  async compareHash(password, hashPassword) {
    return await bcrypt.compare(password, hashPassword);
  },

  generateToken(user) {
    return jwt.sign({ id: user.id }, process.env.JWT_KEY, {
      expiresIn: "1d",
    });
  },

  async create({ nome, email, password }) {
    const userAlredyExists = await User.findOne({ where: { email } });

    if (userAlredyExists) {
      throw new AppError("Usuário já existente");
    }

    if (!nome) {
      throw new AppError("Favor informar o campo nome.");
    }

    if (nome && nome.length > 60) {
      throw new AppError("O campo nome deve ter no máximo 60 caracteres.");
    }

    if (!email) {
      throw new AppError("Favor informar o campo e-mail.");
    }

    if (!emailValidator.validate(email)) {
      throw new AppError(" Email invalido ");
    }

    if (email && email.length > 50) {
      throw new AppError("O campo email deve ter no máximo 50 caracteres.");
    }

    if (!password) {
      throw new AppError("Favor informar o campo senha.");
    }

    if (password && password.length > 20) {
      throw new AppError("A senha deve ter no máximo 20 caracteres.");
    }

    const hashPassword = await this.generateHash(password);
    await User.create({ nome, email, password: hashPassword });
  },

  async authenticate({ email, password }) {
    const user = await User.findOne({ where: { email } });

    const usuarioNaoEncontrado = !user;
    if (usuarioNaoEncontrado) {
      throw new AppError("Usuario ou senha inválido.");
    }

    const senhaInvalida = !(await this.compareHash(password, user.password));
    if (senhaInvalida) {
      throw new AppError("Usuário ou senha inválido.");
    }

    const token = this.generateToken(user);

    return {
      user: user.nome,
      email: user.email,
      token,
    };
  },
};
