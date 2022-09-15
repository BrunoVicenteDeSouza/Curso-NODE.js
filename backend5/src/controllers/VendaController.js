const { Venda, PC, Venda_PC } = require('../db/models');

module.exports = {
    async index(req, res) {
      try {
        const vendas = await Venda.findAll({ include: PC });
  
        res.json(vendas);
      } catch (error) {
        console.error(error);
        res.json({ menssage: 'Falha ao buscar vendas.' });
      }
    },
  
    async show(req, res) {
      const id = parseInt(req.params.id);
      try {
        const venda = await Venda.findOne({
          where: { id: id },
          include: Venda_PC,
        });
  
        res.json(venda);
      } catch (error) {
        console.error(error);
        res.json({ menssage: 'Falha ao buscar venda.' });
      }
    },
  
    async store(req, res) {
      const { valor, pc: pc_id } = req.body;
  
      try {
        const pc = await PC.findAll({
          where: { id: pc_id },
        });
  
        const venda = await Venda.create({ valor });
        await venda.addPC(pc);
  
        const resp = {
          menssage: 'Venda inserida com sucesso!',
          data: { venda: venda, pc: await venda.getPCs() },
        };
  
        res.json(resp);
      } catch (error) {
        console.error(error);
        res.json({ menssage: 'Falha ao inserir venda.' });
      }
    },
  
    async update(req, res) {
      const id = req.params.id;
      const { valor, pc: pc_id } = req.body;
  
      try {
        const venda = await Venda.findOne({ where: { id: id } });
        const novosPCs = await PC.findAll({
          where: { id: pc_id },
        });
  
        const vendaAtualizada = {};
        const { valor } = req.body;
        vendaAtualizada.id = id;
        vendaAtualizada.valor = valor;
  
        venda.set(vendaAtualizada);
  
        const PCsAntigos = await venda.getPCs();
        await venda.removePC(PCsAntigos);
        await venda.addPC(novosPCs);
        await venda.save();
  
        res.json({ menssage: 'Venda atualizada com sucesso!' });
      } catch (error) {
        console.error(error);
        res.json({ menssage: 'Falha ao atualizar venda.' });
      }
    },
  
    async destroy(req, res) {
      const id = parseInt(req.params.id);
  
      try {
        await Venda_PC.destroy({ where: { venda_id: id } });
        await Venda.destroy({ where: { id: id } });
  
        res.json({ menssage: 'Venda removida com sucesso!' });
      } catch (error) {
        console.error(error);
        res.json({ menssage: 'Falha ao excluir venda.' });
      }
    },
  };
  