const { Componentes, PC } = require('../db/models');

module.exports = {
    async index(req, res) {
        try {
            const componentes = await Componentes.findAll({ include: PC });

            res.json(componentes);
        } catch (error) {
            console.error(error);
            res.json({ menssage: 'falha ao buscar componentes.' });
        }
    },

    async show(req, res) {
        const id = parseInt(req.params.id);
        try {
            const componentes = await Componentes.findOne({
                 where: { id: id },
                 include: PC
                });

            res.json(componentes);
        } catch (error) {
            console.error(error);
            res.json({ menssage: 'Falha ao buscar componente.' });
        }
    },

    async store(req, res) {
        const body = {
            descricao: req.body.descricao,
            capacidade: req.body.capacidade,
            pc_id: req.body.pc_id,
        };

        try {
            const componentes = await Componentes.create(body);

            const resp = {
                menssage: 'Componente inserido com sucesso!',
                data: componentes,
            };

            res.json(resp);
        } catch (error) {
            console.error(error);
            res.json({ menssage: 'Falha ao inserir componente.' });
        }
    },

    async update(req, res) {
        const id = parseInt(req.params.id);

        try {
            const componentes = await Componentes.findOne({ where: { id: id } });

            const componenteAtualizado = {};
            const { descricao, capacidade, pc_id } = req.body;
            componenteAtualizado.id = id;
            componenteAtualizado.descricao = descricao;
            componenteAtualizado.capacidade = capacidade;
            componenteAtualizado.pc_id = pc_id;

            componentes.set(componenteAtualizado);
            await componentes.save();

            res.json({ menssage: 'Componente atualizado com sucesso!' });
        } catch (error) {
            console.error(error);
            res.json({ menssage: 'Falha ao atualizar componente.' });
        }
    },

    async destroy(req, res) {
        const id = parseInt(req.params.id);

        try {
            await Componentes.destroy({ where: { id: id } });

            res.json({ menssage: 'Componente removido com sucesso!' });
        } catch (error) {
            console.error(error);
            res.json({ menssage: 'Falha ao remover componente.' });
        }
    },
};