const { User } = require('../db/models');
const UserService = require('../services/UserService');

module.exports = {
    async register(req, res) {
        const { nome, email, password } = req.body;

        try {
            const hashPassword = await UserService.generateHash(password);
            await User.create({ nome, email, password: hashPassword });

            return res.status(201).send();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Falha ao inserir usuário' });
        }
    },

    async authenticate(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ where: { email } });

            const usuarioNaoEncontrado = !user;
            if (usuarioNaoEncontrado) {
                return res.status(400).json({ error: 'Usuario ou senha inválido.' });
            }

            const senhaInvalida = !(await UserService.compareHash(password, user.password));
            if (senhaInvalida) {
                return res.status(400).json({ error: 'Usuário ou senha inválido.' });
            }

            const token = UserService.generateToken(user);

            return res.json({
                user: user.nome,
                email: user.email,
                token
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Falha ao autenticar o usuário.' });
        }
    }
};