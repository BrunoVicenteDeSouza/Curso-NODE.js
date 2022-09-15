const { Consoles } = require('../db/models');

module.exports = {
    async index(req, res) {
        try {
            const consoles = await Consoles.findAll()

            res.json(consoles);
        } catch (error) {
            console.error(error);
            res.json({ message: 'Falha ao buscar consoles.' });
        }
    },

    async show(req, res) {
        const id = parseInt(req.params.id);
        try {
            const consoles = await Consoles.findOne({ where: { id: id } });

            res.json(consoles);
        } catch (error) {
            console.error(error);
            res.json({ message: 'Falha ao buscar console.' });
        }
    },

    async store(req, res) {
        const body = { descricao: req.body.descricao };

        try {
            const consoles = await Consoles.create(body);

            const resp = {
                message: 'Console inserido com sucesso!',
                data: consoles,
            };

            res.json(resp);
        } catch (error) {
            console.error(error)
            res.json({ message: 'Falha ao inserir console.' });
        }
    },

    async update(req, res) {
        const id = parseInt(req.params.id);

        try {
            const consoles = await Consoles.findOne({ where: { id: id } });

            const consoleAtualizado = {};
            const { descricao } = req.body;
            consoleAtualizado.id = id;
            consoleAtualizado.descricao = descricao;

            consoles.set(consoleAtualizado);
            await consoles.save();

            res.json({ message: 'Console atualizado com sucesso!' });
        } catch (error) {
            console.error(error);
            res.json({ message: 'Falha ao atualizar console.' });
        }
    },

    async destroy(req, res) {
        const id = parseInt(req.params.id);

        try {
            await Consoles.destroy({ where: { id: id } });

            res.json({ message: 'Console apagado com sucesso.' });
        } catch (error) {
            console.error(error);
            res.json({ message: 'Falha ao apagar console.' });
        }
    },
};