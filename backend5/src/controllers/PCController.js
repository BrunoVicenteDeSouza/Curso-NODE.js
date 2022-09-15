const { PC, Componentes } = require('../db/models');

module.exports = {
    async index(req, res) {
        try {
            const pc = await PC.findAll({ include: Componentes });

            res.json(pc);
        } catch (error) {
            console.error(error);
            res.json({ menssage: 'Falha ao buscar PCs.' });
        }
    },

    async show(req, res) {
        const id = parseInt(req.params.id);
        try {
            const pc = await PC.findOne({
                 where: {id: id},
                 include: Componentes,
                });

            res.json(pc);
        } catch (error) {
            console.error(error);
            res.json({ menssage: 'Falha ao buscar PC. '});
        }
    },

    async store(req, res) {
        const body = {
            descricao: req.body.descricao,
            preco: req.body.preco,
        };

        try {
            const pc = await PC.create(body);

            const resp = {
                menssage: 'PC inserido com sucesso!',
                data: pc,
            };

            res.json(resp);
        } catch (error) {
            console.error(error);
            res.json({ menssage: 'Falha ao inserir PC.'});
        }
    },

    async update(req, res) {
        const id = parseInt(req.params.id);

        try {
            const pc = await PC.findOne({ where: { id: id } });

            const pcAtualizado = {};
            const { descricao, preco } = req.body;
            pcAtualizado.id = id;
            pcAtualizado.descricao = descricao;
            pcAtualizado.preco = preco;

            pc.set(pcAtualizado);
            await pc.save();

            res.json({ menssage: 'PC atualizado com sucesso!' });
        } catch (error) {
            console.error(error);
            res.json({ message: 'Falha ao atualizar PC.' });
        }
    },

    async destroy(req, res) {
        const id = parseInt(req.params.id);

        try {
            await PC.destroy({ where: { id: id } });

            res.json({ menssage: 'PC removido com sucesso!' });
        } catch (error) {
            console.error(error);
            res.json({ menssage: 'Falha ao excluir PC.'});
        }
    },
};