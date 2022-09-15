const { Jogos, Consoles } = require('../db/models');
const { store, update, destroy } = require('./ConsolesController');

module.exports = {
    async index(req, res) {
        try {
            const jogos = await Jogos.findAll({ include: Consoles });

            res.json(jogos);
        } catch (error) {
            console.error(error);
            res.json({ message: 'Falha ao buscar jogos.' });
        }
    },

    async show(req, res) {
        const id = parseInt(req.params.id);
        try {
            const jogos = await Jogos.findOne({
                where: { id: id },
                include: Consoles,
            });

            res.json(jogos);
        } catch (error) {
            console.error(error);
            res.json({ message: 'Falha ao buscar jogo.' });
        }
    },

    async store(req, res) {
        const body = {
            nome: req.body.nome,
            preco: req.body.preco,
            console_id: req.body.console_id,
        };

        try {
            const jogos = await Jogos.create(body);

            const resp = {
                message: 'Jogo inserido com sucesso!',
                data: jogos,
            };

            res.json(resp);
        } catch (error) {
            console.error(error);
            res.json({ message: 'Falha ao inserir jogo.' });
        }
    },

    async update(req, res) {
        const id = parseInt(req.params.id);
        
        try {
            const jogos = await Jogos.findOne({ where: { id: id } });

            const jogoAtualizado = {};
            const { nome, preco, console_id } = req.body;
            jogoAtualizado.id = id;
            jogoAtualizado.nome = nome;
            jogoAtualizado.preco = preco;
            jogoAtualizado.console_id = console_id;

            jogos.set(jogoAtualizado);
            await jogos.save();

            res.json({ message: 'Jogo atualizado com sucesso!' });
        } catch (error) {
            console.error(error);
            res.json({ message: 'Falha ao atualizar jogo.' });
        }
    },

    async destroy(req, res) {
        const id = parseInt(req.params.id);

        try {
            await Jogos.destroy({ where: { id: id } });

            res.json({ message: 'Jogo removido com sucesso!' });
        } catch (error) {
            console.error(erro);
            res.json({ message: 'Falha ao excluir jogo.' });
        }
    }
};