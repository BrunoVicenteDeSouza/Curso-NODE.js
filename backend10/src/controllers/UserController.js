const UserService = require("../services/UserService");

module.exports = {
  async register(req, res) {
    const { nome, email, password } = req.body;

    await UserService.create({ nome, email, password });

    return res.status(201).send();
  },

  async authenticate(req, res) {
    const { email, password } = req.body;

    const response = await UserService.authenticate({ email, password });

    return res.json(response);
  },
};
